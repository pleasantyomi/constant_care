import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { signInCodeSchema, signInEmailSchema } from '@constant-care/shared';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/lib/auth';
import { color } from '@/lib/theme';

// Passwordless sign-in: email → 6-digit code → signed in. For now this is
// for referrers (anyone who has sent us a referral from that address).
export default function SignIn() {
  const insets = useSafeAreaInsets();
  const { requestCode, verifyCode } = useAuth();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendCode() {
    const parsed = signInEmailSchema.safeParse({ email });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? 'Enter a valid email');
    setBusy(true);
    setError(null);
    try {
      await requestCode(parsed.data.email);
      setEmail(parsed.data.email);
      setStep('code');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function confirmCode() {
    const parsed = signInCodeSchema.safeParse({ email, code });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? 'Enter the 6-digit code');
    setBusy(true);
    setError(null);
    try {
      await verifyCode(parsed.data.email, parsed.data.code);
      router.dismiss();
      router.navigate('/refer');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That code didn’t work.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-6 px-5"
      contentContainerStyle={{ paddingTop: 24, paddingBottom: insets.bottom + 24 }}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={() => router.back()}
        className="h-11 w-11 items-center justify-center rounded-full bg-secondary">
        <X size={20} color={color.foreground} />
      </Pressable>

      {step === 'email' ? (
        <>
          <View className="gap-2">
            <Text variant="display" accessibilityRole="header">
              Sign in
            </Text>
            <Text className="text-base">
              Referred someone to us? Sign in with the email you used on your referral, and
              we&apos;ll send you a code. No password needed.
            </Text>
          </View>
          <Field label="Email" error={error ?? undefined}>
            <Input
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(null);
              }}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="send"
              onSubmitEditing={sendCode}
              invalid={!!error}
              autoFocus
            />
          </Field>
          <Button loading={busy} onPress={sendCode}>
            Email me a code
          </Button>
          <Text variant="caption" className="text-center">
            Family and caregiver accounts are coming soon.
          </Text>
        </>
      ) : (
        <>
          <View className="gap-2">
            <Text variant="display" accessibilityRole="header">
              Check your email
            </Text>
            <Text className="text-base">
              If {email} has referrals with us, we&apos;ve sent a 6-digit code. It expires in 10
              minutes.
            </Text>
          </View>
          <Field label="Code" error={error ?? undefined}>
            <Input
              value={code}
              onChangeText={(text) => {
                setCode(text.replace(/\D/g, '').slice(0, 6));
                setError(null);
              }}
              placeholder="123456"
              keyboardType="number-pad"
              autoComplete="one-time-code"
              textContentType="oneTimeCode"
              returnKeyType="done"
              onSubmitEditing={confirmCode}
              invalid={!!error}
              className="text-center font-sans-bold text-2xl tracking-[8px]"
              autoFocus
            />
          </Field>
          <Button loading={busy} onPress={confirmCode}>
            Sign in
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              setStep('email');
              setCode('');
              setError(null);
            }}>
            Use a different email
          </Button>
        </>
      )}
    </ScrollView>
  );
}
