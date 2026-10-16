import type { ReactNode } from 'react';
import { Platform, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';
import { cn } from '@/lib/cn';
import { color } from '@/lib/theme';

// Scrollable screen body. The ScrollView must be the screen's first child
// so iOS native tabs and headers can track it (Liquid Glass tab bar
// minimising on scroll, scroll-to-top, collapsing large titles).
//
// insets:
//   'manual'    (default) Content starts at the very top so blue banners sit
//               under the status bar; a spacer at the end clears the glass
//               tab bar / home indicator, and content scrolls behind it.
//   'automatic' Screens with a native header (large titles): iOS insets the
//               content below the header itself.
export function Screen({
  children,
  insets = 'manual',
  tone = 'default',
  refreshing = false,
  onRefresh,
}: {
  children: ReactNode;
  insets?: 'manual' | 'automatic';
  /** 'surface': light mist behind white cards (settings-style screens). */
  tone?: 'default' | 'surface';
  refreshing?: boolean;
  onRefresh?: () => void;
}) {
  return (
    <ScrollView
      className={cn('flex-1', tone === 'surface' ? 'bg-surface' : 'bg-background')}
      contentContainerClassName="pb-12"
      contentInsetAdjustmentBehavior={insets === 'automatic' ? 'automatic' : 'never'}
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={color.accent}
            colors={[color.accent]}
          />
        ) : undefined
      }>
      {children}
      {/* Clears the iOS tab bar / home indicator. Android's native tabs already
          inset the screen, so it's iOS-only there. */}
      {insets === 'manual' && Platform.OS !== 'android' && <SafeAreaView edges={{ bottom: true }} />}
    </ScrollView>
  );
}
