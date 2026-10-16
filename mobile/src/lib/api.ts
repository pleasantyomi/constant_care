import { SITE_URL } from './config';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

type Options = { token?: string };

// The website's API routes return { error } with a human-readable message
// on failure (the same messages the website shows), so surface that.
async function request<T>(path: string, init: RequestInit = {}, { token }: Options = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  let response: Response;
  try {
    response = await fetch(`${SITE_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(
      'We couldn’t reach Constant Care. Check your connection and try again.',
      0,
    );
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(body?.error || 'Something went wrong. Please try again.', response.status);
  }
  return body as T;
}

export function getJson<T>(path: string, options?: Options) {
  return request<T>(path, {}, options);
}

export function postJson<T = { ok: true }>(path: string, data: unknown, options?: Options) {
  return request<T>(
    path,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) },
    options,
  );
}

export function postForm<T = { ok: true }>(path: string, form: FormData) {
  return request<T>(path, { method: 'POST', body: form });
}
