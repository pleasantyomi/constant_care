import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { ClipboardList, Plus } from 'lucide-react-native';
import { formCopy } from '@constant-care/shared';
import { EmptyState } from '@/components/brand/empty-state';
import { FadeIn } from '@/components/brand/fade-in';
import { ReferralProgress, UrgencyBadge } from '@/components/brand/referral-progress';
import { Screen } from '@/components/brand/screen';
import { ScreenHeader } from '@/components/brand/screen-header';
import { ReferralForm } from '@/components/forms/referral-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { isSignedOutError, useAuth } from '@/lib/auth';
import { cn } from '@/lib/cn';
import { useMyReferrals } from '@/lib/queries';
import { color } from '@/lib/theme';

export default function Refer() {
  const { session } = useAuth();
  return session ? <Tracker token={session.token} /> : <GuestRefer />;
}

// Signed out: the referral form, with a way in for returning referrers.
function GuestRefer() {
  return (
    <Screen>
      <ScreenHeader title="Make a referral" subtitle={formCopy.referral.intro} />
      <View className="gap-6 px-4 pt-4">
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/sign-in')}
          className="flex-row items-center gap-3 rounded-2xl bg-secondary p-4"
          style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}>
          <ClipboardList size={22} color={color['accent-text']} />
          <View className="flex-1">
            <Text variant="label">Already referred someone?</Text>
            <Text variant="caption">Sign in to track your referrals.</Text>
          </View>
          <Text className="font-sans-bold text-sm text-primary">Sign in</Text>
        </Pressable>
        <ReferralForm />
      </View>
    </Screen>
  );
}

// Signed in: the referral tracker from the redesign.
function Tracker({ token }: { token: string }) {
  const { signOut } = useAuth();
  const query = useMyReferrals(token);
  const [tab, setTab] = useState<'active' | 'closed'>('active');

  // Session expired or revoked: drop back to the signed-out view.
  useEffect(() => {
    if (isSignedOutError(query.error)) signOut();
  }, [query.error, signOut]);

  const all = query.data?.referrals ?? [];
  const active = all.filter((referral) => referral.status !== 'closed');
  const closed = all.filter((referral) => referral.status === 'closed');
  const shown = tab === 'active' ? active : closed;

  return (
    <Screen onRefresh={query.refetch} refreshing={query.isRefetching}>
      <ScreenHeader
        kicker={query.data?.organization ?? query.data?.email}
        title="My referrals"
        trailing={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="New referral"
            onPress={() => router.push('/new-referral')}
            className="h-12 w-12 items-center justify-center rounded-full bg-primary"
            style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}>
            <Plus size={24} color="#FFFFFF" />
          </Pressable>
        }
      />

      <View className="gap-4 px-4 pt-4">
        <View accessibilityRole="tablist" className="flex-row gap-2">
          {(
            [
              ['active', `Active · ${active.length}`],
              ['closed', `Closed · ${closed.length}`],
            ] as const
          ).map(([key, label]) => (
            <Pressable
              key={key}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === key }}
              onPress={() => setTab(key)}
              className={cn(
                'min-h-11 justify-center rounded-full px-4',
                tab === key ? 'bg-foreground' : 'border border-border bg-background',
              )}>
              <Text
                className={cn('font-sans-bold text-sm', tab === key ? 'text-white' : 'text-foreground')}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {query.isPending ? (
          <Text className="text-center">Loading your referrals…</Text>
        ) : query.isError ? (
          <EmptyState
            icon={ClipboardList}
            message={query.error.message}
            action={<Button onPress={() => query.refetch()}>Try again</Button>}
          />
        ) : shown.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            message={tab === 'active' ? 'No active referrals right now.' : 'No closed referrals yet.'}
            action={
              tab === 'active' ? (
                <Button onPress={() => router.push('/new-referral')}>New referral</Button>
              ) : undefined
            }
          />
        ) : (
          shown.map((referral, index) => (
            <FadeIn key={referral.id} index={index}>
              <Card className="gap-4 rounded-2xl border-0 p-5">
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1 gap-0.5">
                    <Text variant="title">Client {referral.clientInitials}</Text>
                    <Text variant="caption">
                      {referral.service ?? 'Service to be confirmed'} · sent{' '}
                      {new Date(referral.createdAt).toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <UrgencyBadge urgency={referral.urgency} />
                </View>
                <ReferralProgress status={referral.status} />
                {referral.update && <Text className="text-foreground">{referral.update}</Text>}
              </Card>
            </FadeIn>
          ))
        )}
      </View>
    </Screen>
  );
}
