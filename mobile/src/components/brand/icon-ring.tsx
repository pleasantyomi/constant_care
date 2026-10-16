import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { cn } from '@/lib/cn';
import { color } from '@/lib/theme';

// Teal icon inside a teal-outlined circle, as on the website's value,
// audience, and empty-state cards.
export function IconRing({
  icon: Icon,
  size = 'md',
  className,
}: {
  icon: LucideIcon;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <View
      className={cn(
        'items-center justify-center rounded-full border border-accent',
        size === 'md' ? 'h-14 w-14' : 'h-12 w-12',
        className,
      )}>
      <Icon size={size === 'md' ? 28 : 24} color={color.accent} />
    </View>
  );
}
