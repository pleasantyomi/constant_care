import { View } from 'react-native';
import { cn } from '@/lib/cn';
import { Text } from '@/components/ui/text';
import { AccentDash } from './accent-dash';

// Eyebrow + accent dash + heading + intro: the pattern that opens most
// sections on the website (see components/about-us/*).
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'center',
  className,
}: {
  eyebrow: string;
  title?: string;
  intro?: string;
  align?: 'start' | 'center';
  className?: string;
}) {
  const center = align === 'center';
  return (
    <View className={cn('gap-2', center && 'items-center', className)}>
      <Text variant="eyebrow" className={cn(center && 'text-center')}>
        {eyebrow}
      </Text>
      <AccentDash align={align} />
      {title && (
        <Text variant="heading" accessibilityRole="header" className={cn('mt-2', center && 'text-center')}>
          {title}
        </Text>
      )}
      {intro && <Text className={cn('mt-2', center && 'text-center')}>{intro}</Text>}
    </View>
  );
}
