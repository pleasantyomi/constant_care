import { useState } from 'react';

// Just the bit of a zod schema this hook uses, so the app needn't depend on
// zod directly; the schemas come from packages/shared (the same ones the
// website's API routes validate with).
type Schema<T> = {
  safeParse(
    value: unknown,
  ):
    | { success: true; data: T }
    | { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } };
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function useSchemaForm<V extends Record<string, unknown>, T>(schema: Schema<T>, initial: V) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof V, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  function set<K extends keyof V>(key: K, value: V[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  }

  // Runs the schema; on failure shows the first message per field and
  // returns null.
  function validate(): T | null {
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return result.data;
    }
    const next: Partial<Record<keyof V, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof V;
      if (key && !next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return null;
  }

  async function submit(send: (data: T) => Promise<unknown>) {
    const data = validate();
    if (!data) {
      // The field errors are above the button, often off screen on a phone.
      setStatus('error');
      setSubmitError('Please check the highlighted fields above.');
      return false;
    }
    setStatus('sending');
    setSubmitError(null);
    try {
      await send(data);
      setStatus('sent');
      setValues(initial);
      return true;
    } catch (error) {
      setStatus('error');
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      return false;
    }
  }

  return { values, set, errors, status, submitError, submit, setValues };
}
