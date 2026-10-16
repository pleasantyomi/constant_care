import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { ScreenHeader } from '@/components/brand/screen-header';
import { FadeIn } from '@/components/brand/fade-in';
import { Screen } from '@/components/brand/screen';
import { Card } from '@/components/ui/card';
import { RemoteImage } from '@/components/ui/remote-image';
import { Text } from '@/components/ui/text';
import { useServices } from '@/lib/queries';
import { color } from '@/lib/theme';

export default function Services() {
  const { data: services, refetch, isRefetching } = useServices();

  return (
    <Screen onRefresh={refetch} refreshing={isRefetching}>
      <ScreenHeader title="Services" subtitle="How we support individuals and families." />

      <View className="gap-5 px-4 pt-4">
        {services.map((service, index) => (
          <FadeIn key={service.slug} index={index}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={service.title}
              onPress={() => router.push(`/services/${service.slug}`)}
              style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}>
              <Card className="overflow-hidden p-0">
                <RemoteImage
                  source={service.heroImageUrl}
                  contentFit="cover"
                  transition={200}
                  accessibilityIgnoresInvertColors
                  className="aspect-video w-full bg-secondary"
                />
                <View className="flex-row items-center gap-3 p-5">
                  <View className="flex-1 gap-1">
                    <Text variant="title">{service.title}</Text>
                    <Text numberOfLines={3}>{service.description}</Text>
                  </View>
                  <ChevronRight size={20} color={color.accent} />
                </View>
              </Card>
            </Pressable>
          </FadeIn>
        ))}
      </View>
    </Screen>
  );
}
