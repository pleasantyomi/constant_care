import type { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/lib/cn';

// The website's blue banner (components/shared/background.tsx): Harmony
// Blue with the brand pattern multiplied over it at 40%. Extends under the
// status bar when it's the first thing on screen.
export function Banner({
  children,
  underStatusBar = true,
  className,
}: {
  children: ReactNode;
  underStatusBar?: boolean;
  className?: string;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={cn('overflow-hidden bg-primary px-4 pb-10', className)}
      style={{ paddingTop: (underStatusBar ? insets.top : 0) + 32 }}>
      {/* React Native supports blend modes on Views, so blend the wrapper. */}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: 0.4, mixBlendMode: 'multiply' }]}>
        <Image
          source={require('@/assets/images/banner-pattern.jpg')}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          style={StyleSheet.absoluteFill}
        />
      </View>
      {children}
    </View>
  );
}
