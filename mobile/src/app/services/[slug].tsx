import { Platform, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check, SearchX } from 'lucide-react-native';
import { AccentDash } from '@/components/brand/accent-dash';
import { EmptyState } from '@/components/brand/empty-state';
import { FadeIn } from '@/components/brand/fade-in';
import { Screen } from '@/components/brand/screen';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RemoteImage } from '@/components/ui/remote-image';
import { Text } from '@/components/ui/text';
import { useService } from '@/lib/queries';
import { color } from '@/lib/theme';

export default function ServiceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data: service } = useService(slug);

  if (!service) {
    return (
      <Screen insets="automatic">
        <View className="px-4 pt-10">
          <EmptyState
            icon={SearchX}
            message="We couldn't find that service."
            action={<Button onPress={() => router.replace('/services')}>See All Services</Button>}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* iOS: transparent header over the photo, so just the glass back button. */}
      <Stack.Screen options={{ title: Platform.OS === 'ios' ? '' : service.title }} />
      {/* The photo runs under the status bar on iOS: light text over it. */}
      {Platform.OS === 'ios' && <StatusBar style="light" />}
      <RemoteImage
        source={service.heroImageUrl}
        contentFit="cover"
        transition={200}
        accessibilityIgnoresInvertColors
        className="aspect-video w-full bg-secondary"
      />

      <View className="gap-4 px-4 pt-8">
        <FadeIn className="gap-2">
          <Text variant="heading" accessibilityRole="header">
            {service.header}
          </Text>
          <AccentDash />
          <Text className="mt-2">{service.description}</Text>
        </FadeIn>

        {service.groups.map((group, index) => (
          <FadeIn key={group.title} index={index}>
            <Card className="gap-3">
              <Text variant="title">{group.title}</Text>
              {group.items.map((item) => (
                <View key={item} className="flex-row gap-3">
                  <Check size={18} color={color.accent} style={{ marginTop: 2 }} />
                  <Text className="flex-1 text-foreground">{item}</Text>
                </View>
              ))}
            </Card>
          </FadeIn>
        ))}

        {service.note && <Text className="font-sans-italic">{service.note}</Text>}

        <View className="mt-4 gap-3">
          <Button onPress={() => router.push('/refer')}>Make a Referral</Button>
          <Button variant="outline" onPress={() => router.push('/contact')}>
            Ask Us a Question
          </Button>
        </View>
      </View>
    </Screen>
  );
}
