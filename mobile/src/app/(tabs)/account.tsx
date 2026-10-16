import type { ReactNode } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import {
  ChevronRight,
  FileText,
  Info,
  LogOut,
  Mail,
  Phone,
  Shield,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import { contact } from '@constant-care/shared';
import { Screen } from '@/components/brand/screen';
import { ScreenHeader } from '@/components/brand/screen-header';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/lib/auth';
import { SITE_URL } from '@/lib/config';
import { callUs } from '@/lib/links';
import { color } from '@/lib/theme';

function Row({
  icon: Icon,
  label,
  detail,
  onPress,
  tone = 'default',
}: {
  icon: LucideIcon;
  label: string;
  detail?: string;
  onPress: () => void;
  tone?: 'default' | 'destructive';
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="min-h-14 flex-row items-center gap-3 px-4 py-3"
      style={({ pressed }) => (pressed ? { opacity: 0.6 } : undefined)}>
      <Icon size={20} color={tone === 'destructive' ? color.destructive : color['accent-text']} />
      <View className="flex-1">
        <Text variant="label" className={tone === 'destructive' ? 'text-destructive' : undefined}>
          {label}
        </Text>
        {detail && <Text variant="caption">{detail}</Text>}
      </View>
      {tone === 'default' && <ChevronRight size={18} color={color['muted-foreground']} />}
    </Pressable>
  );
}

function Group({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <View className="gap-2">
      {title && (
        <Text variant="eyebrow" className="px-1">
          {title}
        </Text>
      )}
      <View className="overflow-hidden rounded-2xl bg-card">{children}</View>
    </View>
  );
}

export default function Account() {
  const { session, signOut } = useAuth();

  return (
    <Screen tone="surface">
      <View className="pb-4">
        <ScreenHeader title="Account" />
        <View className="gap-6 px-4 pt-4">
          {session ? (
            <Group>
              <View className="flex-row items-center gap-3 p-4">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <UserRound size={22} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text variant="label">{session.email}</Text>
                  <Text variant="caption">Referrer account</Text>
                </View>
              </View>
              <Row icon={FileText} label="My referrals" onPress={() => router.navigate('/refer')} />
            </Group>
          ) : (
            <View className="gap-3 rounded-2xl bg-primary p-5">
              <Text variant="title" className="text-white">
                Sign in to track your referrals
              </Text>
              <Text className="text-white/85">
                Use the email on your referrals. Family and caregiver accounts are coming soon.
              </Text>
              <Button variant="inverse" onPress={() => router.push('/sign-in')}>
                Sign in
              </Button>
            </View>
          )}

          <Group title="Get in touch">
            <Row icon={Phone} label="Call us" detail={contact.phoneDisplay} onPress={callUs} />
            <Row icon={Mail} label="Send a message" onPress={() => router.push('/contact')} />
          </Group>

          <Group title="About Constant Care">
            <Row icon={Info} label="About us" onPress={() => router.push('/about')} />
            <Row icon={Users} label="Our team" onPress={() => router.push('/team')} />
            <Row
              icon={Shield}
              label="Privacy policy"
              onPress={() => Linking.openURL(`${SITE_URL}/privacy-policy`)}
            />
            <Row
              icon={FileText}
              label="Terms of service"
              onPress={() => Linking.openURL(`${SITE_URL}/terms-of-service`)}
            />
          </Group>

          {session && (
            <Group>
              <Row icon={LogOut} label="Sign out" tone="destructive" onPress={signOut} />
            </Group>
          )}
        </View>
      </View>
    </Screen>
  );
}
