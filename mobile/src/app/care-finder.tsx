import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, X } from 'lucide-react-native';
import {
  careFinderQuestions,
  matchServices,
  summarizeAnswers,
  type FinderAnswers,
} from '@constant-care/shared';
import { FadeIn } from '@/components/brand/fade-in';
import { Button } from '@/components/ui/button';
import { OptionCard, StepProgress } from '@/components/ui/option-card';
import { Text } from '@/components/ui/text';
import { useServices } from '@/lib/queries';
import { color } from '@/lib/theme';

// The 2-minute care finder: four questions (packages/shared/care-finder.ts),
// then matched services with a way to talk to someone.
export default function CareFinder() {
  const insets = useSafeAreaInsets();
  const { data: services } = useServices();
  const [step, setStep] = useState(0); // 0..3 questions, 4 = results
  const [answers, setAnswers] = useState<FinderAnswers>({});

  const total = careFinderQuestions.length;
  const question = careFinderQuestions[step];
  const matches = useMemo(
    () =>
      matchServices(answers)
        .map((slug) => services.find((service) => service.slug === slug))
        .filter((service) => service !== undefined),
    [answers, services],
  );

  const value = question ? answers[question.id] : undefined;
  const canContinue = question?.multiple ? (value as string[] | undefined)?.length : !!value;

  function choose(optionId: string) {
    if (!question) return;
    if (question.multiple) {
      const current = (answers.needs ?? []) as string[];
      setAnswers({
        ...answers,
        needs: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      });
    } else {
      setAnswers({ ...answers, [question.id]: optionId });
    }
  }

  const summary = summarizeAnswers(answers);

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-5"
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 140 + insets.bottom }}>
        <View className="flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={step === 0 ? 'Close' : 'Back'}
            onPress={() => (step === 0 ? router.back() : setStep(step - 1))}
            className="h-11 w-11 items-center justify-center rounded-full bg-secondary">
            {step === 0 ? (
              <X size={20} color={color.foreground} />
            ) : (
              <ChevronLeft size={22} color={color.foreground} />
            )}
          </Pressable>
          {question && (
            <Text className="font-sans-medium text-sm">
              Question {step + 1} of {total}
            </Text>
          )}
          <View className="w-11" />
        </View>

        {question ? (
          <>
            <StepProgress step={step + 1} total={total} />
            <Text variant="display" accessibilityRole="header">
              {question.title}
            </Text>
            {question.multiple && <Text className="-mt-3">Choose all that apply.</Text>}
            <View
              accessibilityRole={question.multiple ? undefined : 'radiogroup'}
              className="gap-3">
              {question.options.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  detail={option.detail}
                  multiple={question.multiple}
                  selected={
                    question.multiple
                      ? ((value as string[] | undefined) ?? []).includes(option.id)
                      : value === option.id
                  }
                  onPress={() => choose(option.id)}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <View className="gap-2">
              <Text variant="eyebrow">Your matches</Text>
              <Text variant="display" accessibilityRole="header">
                Here&apos;s where we&apos;d start
              </Text>
              <Text className="text-base">{summary}</Text>
            </View>
            {matches.map((service, index) => (
              <FadeIn key={service.slug} index={index}>
                <Pressable
                  accessibilityRole="link"
                  onPress={() => router.push(`/services/${service.slug}`)}
                  className="gap-2 rounded-2xl bg-card p-5 shadow-sm"
                  style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}>
                  <View className="flex-row items-center justify-between gap-2">
                    <Text variant="title" className="flex-1">
                      {service.title}
                    </Text>
                    {index === 0 && (
                      <View className="rounded-full bg-secondary px-2.5 py-1">
                        <Text className="font-sans-bold text-xs text-accent-text">Best match</Text>
                      </View>
                    )}
                  </View>
                  <Text numberOfLines={3}>{service.description}</Text>
                </Pressable>
              </FadeIn>
            ))}
          </>
        )}
      </ScrollView>

      <View
        className="absolute inset-x-0 bottom-0 gap-2 bg-background/95 px-5 pt-3"
        style={{ paddingBottom: insets.bottom + 16 }}>
        {question ? (
          <Button disabled={!canContinue} onPress={() => setStep(step + 1)}>
            {step === total - 1 ? 'See my matches' : 'Continue'}
          </Button>
        ) : (
          <>
            <Button
              onPress={() => {
                router.dismiss();
                router.push({ pathname: '/callback', params: { careFinder: summary } });
              }}>
              Book a free consultation
            </Button>
            <Button
              variant="ghost"
              onPress={() => {
                router.dismiss();
                router.navigate('/refer');
              }}>
              Make a referral instead
            </Button>
          </>
        )}
      </View>
    </View>
  );
}
