import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Users } from 'lucide-react-native';
import { EmptyState } from '@/components/brand/empty-state';
import { FadeIn } from '@/components/brand/fade-in';
import { Screen } from '@/components/brand/screen';
import { SectionHeader } from '@/components/brand/section-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RemoteImage } from '@/components/ui/remote-image';
import { Text } from '@/components/ui/text';
import { useTeam } from '@/lib/queries';

// Mirrors the website's /our-team (components/our-team/team-grid.tsx).
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function Team() {
  const { data: members, isPending, isError, refetch, isRefetching } = useTeam();

  return (
    <Screen insets="automatic" onRefresh={refetch} refreshing={isRefetching}>
      {/* iOS shows a white system header here, so use dark status bar text. */}
      {Platform.OS === 'ios' && <StatusBar style="dark" />}
      <View className="gap-8 px-4 pt-10">
        <SectionHeader
          eyebrow="Our People"
          title="The People Behind the Care"
          intro="Our team brings together experience, compassion, and a shared commitment to helping individuals and families across New Brunswick live with dignity and independence."
        />

        {isPending ? (
          <Text className="text-center">Loading the team…</Text>
        ) : isError ? (
          <EmptyState
            icon={Users}
            message="We couldn't load the team right now. Pull down to try again."
          />
        ) : members.length === 0 ? (
          <EmptyState
            icon={Users}
            message="Team profiles are coming soon. In the meantime, we'd love to hear from you."
            action={<Button onPress={() => router.push('/contact')}>Contact Us</Button>}
          />
        ) : (
          members.map((member, index) => (
            <FadeIn key={member.id} index={index}>
              <Card className="overflow-hidden p-0">
                <View className="aspect-[4/5] w-full items-center justify-center bg-secondary">
                  {member.photoUrl ? (
                    <RemoteImage
                      source={member.photoUrl}
                      contentFit="cover"
                      transition={200}
                      accessibilityLabel={`Portrait of ${member.name}`}
                      className="absolute inset-0"
                    />
                  ) : (
                    <Text className="font-sans-bold text-4xl text-primary/60">
                      {initials(member.name)}
                    </Text>
                  )}
                </View>
                <View className="gap-1 p-6">
                  <Text variant="title">{member.name}</Text>
                  <Text variant="eyebrow" className="tracking-wide">
                    {member.role}
                  </Text>
                  <Text className="mt-3">{member.bio}</Text>
                </View>
              </Card>
            </FadeIn>
          ))
        )}
      </View>
    </Screen>
  );
}
