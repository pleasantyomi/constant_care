import { Image, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  ClipboardPlus,
  MessageSquare,
  Phone,
  UserRound,
  type LucideIcon,
} from 'lucide-react-native';
import { brand } from '@constant-care/tokens';
import { careFinderQuestions } from '@constant-care/shared';
import { FadeIn } from '@/components/brand/fade-in';
import { Screen } from '@/components/brand/screen';
import { RemoteImage } from '@/components/ui/remote-image';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/lib/auth';
import { callUs } from '@/lib/links';
import { useServices } from '@/lib/queries';
import { color } from '@/lib/theme';

function QuickAction({
  icon: Icon,
  title,
  detail,
  onPress,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${detail}`}
      onPress={onPress}
      className="w-[48.5%] gap-2.5 rounded-2xl bg-secondary p-4"
      style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}>
      <Icon size={24} color={color['accent-text']} />
      <Text className="font-sans-bold text-[15px] text-foreground">{title}</Text>
      <Text variant="caption" className="text-[13px] leading-snug">
        {detail}
      </Text>
    </Pressable>
  );
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const { data: services } = useServices();

  return (
    <Screen>
      <View className="gap-6 px-5" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            <Image
              source={require('../../../../public/logo/CCFSI_ICON_B.png')}
              accessibilityIgnoresInvertColors
              resizeMode="contain"
              className="h-9 w-8"
            />
            <Text className="font-sans-bold text-[15px] text-foreground">{brand.shortName}</Text>
          </View>
          {session ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Account"
              onPress={() => router.navigate('/account')}
              className="h-11 w-11 items-center justify-center rounded-full bg-secondary">
              <UserRound size={20} color={color.primary} />
            </Pressable>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/sign-in')}
              className="min-h-11 justify-center rounded-full bg-secondary px-4">
              <Text className="font-sans-bold text-[15px] text-primary">Sign in</Text>
            </Pressable>
          )}
        </View>

        <FadeIn className="gap-2">
          <Text variant="display" accessibilityRole="header" className="text-[32px] leading-[36px]">
            Care that fits your life.
          </Text>
          <Text className="text-base">
            Support at home and in the community across New Brunswick.
          </Text>
        </FadeIn>

        <FadeIn index={1}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start the 2-minute care finder"
            onPress={() => router.push('/care-finder')}
            className="gap-3.5 rounded-[22px] bg-primary p-5"
            style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}>
            <View className="flex-row items-center justify-between">
              <Text className="font-sans-bold text-xs uppercase tracking-widest text-chart-4">
                2-minute care finder
              </Text>
              <ArrowRight size={22} color="#FFFFFF" />
            </View>
            <Text className="font-sans-bold text-[21px] leading-7 text-white">
              Not sure what support you need? Answer {careFinderQuestions.length} questions.
            </Text>
            <View className="flex-row gap-1.5">
              {careFinderQuestions.map((question, index) => (
                <View
                  key={question.id}
                  className={index === 0 ? 'h-1.5 flex-1 rounded-full bg-accent' : 'h-1.5 flex-1 rounded-full bg-white/25'}
                />
              ))}
            </View>
          </Pressable>
        </FadeIn>

        <FadeIn index={2} className="flex-row flex-wrap justify-between gap-y-3">
          <QuickAction
            icon={CalendarDays}
            title="Book a callback"
            detail="Pick a time that suits you"
            onPress={() => router.push('/callback')}
          />
          <QuickAction icon={Phone} title="Call us now" detail="Mon–Fri, 8:00–5:30" onPress={callUs} />
          <QuickAction
            icon={ClipboardPlus}
            title="Refer a client"
            detail="For professionals & family"
            onPress={() => router.navigate('/refer')}
          />
          <QuickAction
            icon={MessageSquare}
            title="Send a message"
            detail="We'll get back to you"
            onPress={() => router.push('/contact')}
          />
        </FadeIn>

        <View className="flex-row items-baseline justify-between">
          <Text accessibilityRole="header" className="font-sans-bold text-xl text-foreground">
            Our services
          </Text>
          <Pressable accessibilityRole="link" onPress={() => router.navigate('/services')} hitSlop={10}>
            <Text className="font-sans-bold text-[15px] text-accent-text">See all</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-5 pt-3"
        accessibilityLabel="Services">
        {services.map((service) => (
          <Pressable
            key={service.slug}
            accessibilityRole="link"
            accessibilityLabel={service.title}
            onPress={() => router.push(`/services/${service.slug}`)}
            className="w-52 gap-2"
            style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}>
            <RemoteImage
              source={service.heroImageUrl}
              contentFit="cover"
              transition={200}
              accessibilityIgnoresInvertColors
              className="h-36 w-52 rounded-2xl bg-border"
            />
            <Text className="font-sans-bold text-[15px] text-foreground" numberOfLines={2}>
              {service.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View className="mx-5 mt-8 overflow-hidden rounded-2xl bg-surface">
        {(
          [
            ['Meet our team', '/team'],
            ['About Constant Care', '/about'],
          ] as const
        ).map(([label, href]) => (
          <Pressable
            key={href}
            accessibilityRole="link"
            onPress={() => router.push(href)}
            className="min-h-14 flex-row items-center justify-between px-4"
            style={({ pressed }) => (pressed ? { opacity: 0.6 } : undefined)}>
            <Text variant="label">{label}</Text>
            <ChevronRight size={18} color={color['muted-foreground']} />
          </Pressable>
        ))}
      </View>

      <Text className="mt-8 px-5 text-center font-sans-medium-italic text-accent-text">
        {brand.tagline}
      </Text>
    </Screen>
  );
}
