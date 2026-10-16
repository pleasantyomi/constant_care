import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '@/lib/cn';
import { Text } from './text';

// A large tappable choice, as in the redesign's care finder. Works as a
// radio (one choice) or checkbox (several).
export function OptionCard({
  label,
  detail,
  selected,
  multiple = false,
  onPress,
}: {
  label: string;
  detail?: string;
  selected: boolean;
  multiple?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole={multiple ? 'checkbox' : 'radio'}
      accessibilityState={multiple ? { checked: selected } : { selected }}
      onPress={onPress}
      className={cn(
        'min-h-16 flex-row items-center gap-4 rounded-2xl px-4 py-4',
        selected ? 'border-2 border-primary bg-surface' : 'border border-border bg-card',
      )}
      style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}>
      <View className="flex-1 gap-0.5">
        <Text className="font-sans-bold text-[17px] text-foreground">{label}</Text>
        {detail && <Text className="text-sm">{detail}</Text>}
      </View>
      <View
        className={cn(
          'h-6 w-6 items-center justify-center border',
          multiple ? 'rounded-md' : 'rounded-full',
          selected ? 'border-primary bg-primary' : 'border-input bg-background',
        )}>
        {selected && <Check size={15} color="#FFFFFF" strokeWidth={3} />}
      </View>
    </Pressable>
  );
}

// Thin segmented progress bar (care finder steps).
export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <View
      className="flex-row gap-1.5"
      accessible
      accessibilityLabel={`Question ${step} of ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          className={cn('h-1.5 flex-1 rounded-full', index < step ? 'bg-accent' : 'bg-secondary')}
        />
      ))}
    </View>
  );
}
