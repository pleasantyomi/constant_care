import { View } from 'react-native';
import { cn } from '@/lib/cn';
import { Text } from '@/components/ui/text';

// The tracker's four-step progress bar. Steps are the admin panel's
// referral statuses (new → contacted → in-progress → closed).
const steps = [
  { status: 'new', label: 'Received' },
  { status: 'contacted', label: 'Contacted' },
  { status: 'in-progress', label: 'In progress' },
  { status: 'closed', label: 'Closed' },
] as const;

export function ReferralProgress({ status }: { status: string }) {
  const current = Math.max(
    0,
    steps.findIndex((step) => step.status === status),
  );
  return (
    <View
      className="gap-2"
      accessible
      accessibilityLabel={`Status: ${steps[current].label}, step ${current + 1} of ${steps.length}`}>
      <View className="flex-row gap-1.5">
        {steps.map((step, index) => (
          <View
            key={step.status}
            className={cn('h-1.5 flex-1 rounded-full', index <= current ? 'bg-accent' : 'bg-secondary')}
          />
        ))}
      </View>
      <View className="flex-row gap-1.5">
        {steps.map((step, index) => (
          <Text
            key={step.status}
            className={cn(
              'flex-1 font-sans text-[11px]',
              index === current ? 'font-sans-bold text-foreground' : 'text-muted-foreground',
            )}>
            {step.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const urgencyStyles: Record<string, { box: string; text: string }> = {
  Urgent: { box: 'bg-destructive/10', text: 'text-destructive' },
  Priority: { box: 'bg-[#FFF4E5]', text: 'text-[#8A4B00]' },
  Standard: { box: 'bg-secondary', text: 'text-accent-text' },
};

export function UrgencyBadge({ urgency }: { urgency: string }) {
  const style = urgencyStyles[urgency] ?? urgencyStyles.Standard;
  return (
    <View className={cn('rounded-full px-2.5 py-1', style.box)}>
      <Text className={cn('font-sans-bold text-xs', style.text)}>{urgency}</Text>
    </View>
  );
}
