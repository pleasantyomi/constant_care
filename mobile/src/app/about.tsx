import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import {
  Accessibility,
  Award,
  Backpack,
  BadgeCheck,
  Building2,
  Compass,
  HandHeart,
  Handshake,
  Heart,
  Landmark,
  TrendingUp,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import {
  aboutHero,
  audiences,
  missionVision,
  optimizedImageUrl,
  values,
  whoWeAre,
  type AudienceIcon,
  type ValueIcon,
} from '@constant-care/shared';
import { AccentDash } from '@/components/brand/accent-dash';
import { Banner } from '@/components/brand/banner';
import { FadeIn } from '@/components/brand/fade-in';
import { IconRing } from '@/components/brand/icon-ring';
import { Screen } from '@/components/brand/screen';
import { SectionHeader } from '@/components/brand/section-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RemoteImage } from '@/components/ui/remote-image';
import { Text } from '@/components/ui/text';
import { SITE_URL } from '@/lib/config';

// Same icon mappings as the website's components/about-us/values.tsx and
// who-we-serve.tsx.
const valueIcons: Record<ValueIcon, LucideIcon> = {
  Heart,
  Award,
  BadgeCheck,
  TrendingUp,
  Users,
  Handshake,
};
const audienceIcons: Record<AudienceIcon, LucideIcon> = {
  Accessibility,
  Backpack,
  HandHeart,
  UserRound,
  Compass,
  Handshake,
  Landmark,
  Building2,
};

// A condensed version of the website's /about-us page.
export default function About() {
  return (
    <Screen insets="automatic">
      {/* iOS shows a white system header here, so use dark status bar text. */}
      {Platform.OS === 'ios' && <StatusBar style="dark" />}
      <Banner underStatusBar={false}>
        <FadeIn className="gap-4">
          <Text variant="heading" accessibilityRole="header" className="text-center text-white">
            {aboutHero.heading}
          </Text>
          <Text className="text-center text-white/85">{aboutHero.intro}</Text>
        </FadeIn>
      </Banner>

      <View className="gap-4 px-4 pt-14">
        <SectionHeader eyebrow={whoWeAre.eyebrow} title={whoWeAre.heading} align="start" />
        {whoWeAre.paragraphs.map((paragraph) => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
        <RemoteImage
          source={optimizedImageUrl(SITE_URL, whoWeAre.image.src)}
          accessibilityLabel={whoWeAre.image.alt}
          contentFit="cover"
          transition={200}
          className="mt-4 aspect-square w-full rounded-2xl bg-secondary"
        />
      </View>

      {/* Mission & vision sit on the blue patterned band, as on the website. */}
      <Banner underStatusBar={false} className="mt-14 gap-10 py-14">
        {missionVision.map((card) => (
          <FadeIn key={card.slug} className="gap-3">
            <Text variant="eyebrow" className="text-white/80">
              {card.title}
            </Text>
            <AccentDash />
            <Text variant="heading" className="mt-1 text-white">
              {card.heading}
            </Text>
            {card.paragraphs.map((paragraph) => (
              <Text key={paragraph} className="text-white/85">
                {paragraph}
              </Text>
            ))}
          </FadeIn>
        ))}
      </Banner>

      <View className="gap-5 px-4 pt-14">
        <SectionHeader eyebrow="Our Values" />
        {values.map((value, index) => (
          <FadeIn key={value.title} index={index}>
            <Card className="gap-3">
              <IconRing icon={valueIcons[value.icon]} />
              <Text variant="title">{value.title}</Text>
              <Text>{value.description}</Text>
            </Card>
          </FadeIn>
        ))}
      </View>

      <View className="mt-14 gap-6 bg-secondary/40 px-4 py-14">
        <SectionHeader eyebrow="Who We Serve" title="We Proudly Support" />
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {audiences.map((audience, index) => (
            <FadeIn key={audience.title} index={index} className="w-[48%]">
              <Card className="h-full items-center gap-3 p-4">
                <IconRing icon={audienceIcons[audience.icon]} size="sm" />
                <Text className="text-center font-sans-medium text-xs text-foreground">
                  {audience.title}
                </Text>
              </Card>
            </FadeIn>
          ))}
        </View>
      </View>

      <View className="gap-3 px-4 pt-14">
        <Button onPress={() => router.push('/team')}>Meet Our Team</Button>
        <Button variant="outline" onPress={() => router.push('/contact')}>
          Contact Us
        </Button>
      </View>
    </Screen>
  );
}
