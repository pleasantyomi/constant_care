import { Text } from '@/components/ui/text';

// Success / error line under a submit button, as on the website's forms.
export function FormStatus({
  status,
  success,
  error,
}: {
  status: 'idle' | 'sending' | 'sent' | 'error';
  success: string;
  error: string | null;
}) {
  if (status === 'sent') {
    return (
      <Text className="text-accent" accessibilityLiveRegion="polite" accessibilityRole="alert">
        {success}
      </Text>
    );
  }
  if (status === 'error' && error) {
    return (
      <Text className="text-destructive" accessibilityLiveRegion="polite" accessibilityRole="alert">
        {error}
      </Text>
    );
  }
  return null;
}
