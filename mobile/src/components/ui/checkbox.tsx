import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '@/lib/cn';
import { Text } from './text';

export function Checkbox({
  checked,
  onChange,
  label,
  invalid,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  invalid?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onChange(!checked)}
      className="min-h-12 flex-row items-start gap-3 py-3">
      <View
        className={cn(
          'mt-0.5 h-6 w-6 items-center justify-center rounded-sm border',
          checked ? 'border-primary bg-primary' : 'border-input bg-background',
          invalid && !checked && 'border-destructive',
        )}>
        {checked && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
      </View>
      <Text className="flex-1 font-sans text-sm leading-relaxed text-foreground">{label}</Text>
    </Pressable>
  );
}
