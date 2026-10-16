import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CalendarCheck } from 'lucide-react-native';
import {
  callbackSchema,
  callbackTimes,
  contact,
  formatCallbackDate,
  formatCallbackSlot,
  formatCallbackTime,
} from '@constant-care/shared';
import { EmptyState } from '@/components/brand/empty-state';
import { FormStatus } from '@/components/brand/form-status';
import { Screen } from '@/components/brand/screen';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { postJson } from '@/lib/api';
import { cn } from '@/lib/cn';
import { useSchemaForm } from '@/lib/use-form';

// The next five weekdays, as YYYY-MM-DD plus labels. Uses the phone's date;
// times are the office's (Atlantic) and are labelled as such.
function nextWeekdays(count: number) {
  const days: { iso: string; weekday: string; day: string }[] = [];
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (days.length < count) {
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) {
      const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      days.push({
        iso,
        weekday: date.toLocaleDateString('en-CA', { weekday: 'short' }),
        day: String(date.getDate()),
      });
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function Chip({
  selected,
  onPress,
  label,
  children,
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      className={cn(
        'min-h-12 flex-1 items-center justify-center rounded-xl px-1 py-2',
        selected ? 'bg-primary' : 'border border-border bg-card',
      )}>
      {children}
    </Pressable>
  );
}

export default function Callback() {
  const { careFinder } = useLocalSearchParams<{ careFinder?: string }>();
  const days = useMemo(() => nextWeekdays(5), []);
  const form = useSchemaForm(callbackSchema, {
    name: '',
    phone: '',
    preferredDate: days[0].iso,
    preferredTime: '' as string,
    note: '',
    careFinder: careFinder ?? '',
  });
  const { values, set, errors } = form;
  const [booked, setBooked] = useState<string | null>(null);

  if (booked) {
    return (
      <Screen insets="automatic">
        <View className="px-4 pt-6">
          <EmptyState
            icon={CalendarCheck}
            message={`You're booked. A care coordinator will call you ${booked} (Atlantic time). If that time no longer works, call us at ${contact.phoneDisplay}.`}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen insets="automatic">
      <View className="gap-6 px-4 pt-2">
        <Text className="text-base">
          A care coordinator will call to talk through your options. It&apos;s free, with no
          commitment.
        </Text>

        <View className="gap-2.5">
          <Text variant="label">Day</Text>
          <View accessibilityRole="radiogroup" className="flex-row gap-2">
            {days.map((day) => {
              const selected = values.preferredDate === day.iso;
              return (
                <Chip
                  key={day.iso}
                  selected={selected}
                  label={`${day.weekday} ${day.day}`}
                  onPress={() => set('preferredDate', day.iso)}>
                  <Text className={cn('text-xs', selected ? 'text-white/80' : 'text-muted-foreground')}>
                    {day.weekday}
                  </Text>
                  <Text className={cn('font-sans-bold text-lg', selected ? 'text-white' : 'text-foreground')}>
                    {day.day}
                  </Text>
                </Chip>
              );
            })}
          </View>
        </View>

        <View className="gap-2.5">
          <Text variant="label">Time (Atlantic)</Text>
          <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-2">
            {callbackTimes.map((time) => {
              const selected = values.preferredTime === time;
              return (
                <View key={time} className="w-[31.5%]">
                  <Chip
                    selected={selected}
                    label={formatCallbackTime(time)}
                    onPress={() => set('preferredTime', time)}>
                    <Text className={cn('font-sans-bold text-[15px]', selected ? 'text-white' : 'text-foreground')}>
                      {formatCallbackTime(time)}
                    </Text>
                  </Chip>
                </View>
              );
            })}
          </View>
          {errors.preferredTime && (
            <Text variant="caption" className="text-destructive">
              {errors.preferredTime}
            </Text>
          )}
        </View>

        <Field label="Your name" error={errors.name}>
          <Input
            value={values.name}
            onChangeText={(text) => set('name', text)}
            placeholder="Full name"
            autoComplete="name"
            textContentType="name"
            invalid={!!errors.name}
          />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <Input
            value={values.phone}
            onChangeText={(text) => set('phone', text)}
            placeholder="(506) 000-0000"
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            invalid={!!errors.phone}
          />
        </Field>
        <Field label="Anything we should know?" optional error={errors.note}>
          <Input
            value={values.note}
            onChangeText={(text) => set('note', text)}
            placeholder="Best number, who the care is for…"
            multiline
          />
        </Field>

        <Button
          loading={form.status === 'sending'}
          onPress={async () => {
            const slot = values.preferredTime
              ? formatCallbackSlot(values.preferredDate, values.preferredTime)
              : null;
            const sent = await form.submit((data) => postJson('/api/callbacks', data));
            if (sent && slot) setBooked(slot);
          }}>
          {values.preferredTime
            ? `Book ${formatCallbackDate(values.preferredDate).split(',')[0]} at ${formatCallbackTime(values.preferredTime)}`
            : 'Book my callback'}
        </Button>
        <FormStatus status={form.status} success="" error={form.submitError} />
      </View>
    </Screen>
  );
}
