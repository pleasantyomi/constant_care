import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/lib/cn';
import { Text } from '@/components/ui/text';

// The redesign's screen opener: a large heavy title with an optional
// kicker above and subtitle below, on the screen's own background (no
// website-style banner). Clears the status bar on tab screens.
export function ScreenHeader({
  kicker,
  title,
  subtitle,
  trailing,
  underStatusBar = true,
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  underStatusBar?: boolean;
  className?: string;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={cn('flex-row items-end justify-between gap-4 px-5 pb-2', className)}
      style={{ paddingTop: (underStatusBar ? insets.top : 0) + 20 }}>
      <View className="flex-1 gap-1">
        {kicker && <Text className="text-base text-muted-foreground">{kicker}</Text>}
        <Text variant="display" accessibilityRole="header">
          {title}
        </Text>
        {subtitle && <Text className="mt-1 text-base">{subtitle}</Text>}
      </View>
      {trailing}
    </View>
  );
}
