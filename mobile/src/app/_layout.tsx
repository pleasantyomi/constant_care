import '../global.css';

import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Uniwind } from 'uniwind';
import { fontFamily } from '@constant-care/tokens';
import { BrandSplash } from '@/components/brand/brand-splash';
import { AuthProvider } from '@/lib/auth';
import { color } from '@/lib/theme';

// Keep the native splash up until BrandSplash is on screen to take over.
SplashScreen.preventAutoHideAsync();

// Light-only for now, matching the website (see MOBILE_APP_PLAN.md §5).
Uniwind.setTheme('light');

// Content is cached on the device for a week, so the app opens with the
// last-loaded team, openings, and services even without a signal, then
// refreshes in the background. (gcTime must be at least the persisted maxAge.)
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, gcTime: WEEK_MS, retry: 2 } },
});
const persister = createAsyncStoragePersister({ storage: AsyncStorage });
// Bump when the shape of cached API data changes, to discard old caches.
const CACHE_VERSION = '1';

// Navigation chrome in brand colours. Also stops a white flash when
// switching native tabs.
const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: color.accent,
    background: color.background,
    card: color.background,
    text: color.foreground,
    border: color.border,
  },
};

// iOS: the system navigation bar (Liquid Glass on iOS 26) with brand-tinted
// back buttons, and large titles on top-level pages. Android: the brand-blue
// bar, as on the website's banners.
const stackOptions = Platform.select({
  ios: {
    headerTintColor: color.accent,
    headerTitleStyle: { color: color.foreground },
    headerLargeTitleStyle: { color: color.primary },
    headerLargeTitleShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal' as const,
    contentStyle: { backgroundColor: color.background },
  },
  default: {
    headerStyle: { backgroundColor: color.primary },
    headerTintColor: color['primary-foreground'],
    headerTitleStyle: { fontFamily: fontFamily.bold },
    headerShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal' as const,
    contentStyle: { backgroundColor: color.background },
  },
});
const largeTitle = Platform.OS === 'ios' ? { headerLargeTitleEnabled: true } : {};

export default function RootLayout() {
  // The same Helvetica Neue files the website serves from public/fonts.
  // Check the font licence covers app embedding before a store release.
  const [fontsLoaded, fontError] = useFonts({
    [fontFamily.light]: require('../../../public/fonts/HelveticaNeueLight.otf'),
    [fontFamily.regular]: require('../../../public/fonts/HelveticaNeueRoman.otf'),
    [fontFamily.italic]: require('../../../public/fonts/HelveticaNeueItalic.ttf'),
    [fontFamily.medium]: require('../../../public/fonts/HelveticaNeueMedium.otf'),
    [fontFamily.mediumItalic]: require('../../../public/fonts/HelveticaNeueMediumItalic.otf'),
    [fontFamily.bold]: require('../../../public/fonts/HelveticaNeueBold.otf'),
    [fontFamily.heavy]: require('../../../public/fonts/HelveticaNeueHeavy.otf'),
  });

  const [splashDone, setSplashDone] = useState(false);
  const finishSplash = useCallback(() => setSplashDone(true), []);

  if (!fontsLoaded && !fontError) return null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: WEEK_MS,
        buster: CACHE_VERSION,
        // Only public content is cached on the device; private data (a
        // referrer's referrals) opts out with meta.persist = false.
        dehydrateOptions: {
          shouldDehydrateQuery: (query) =>
            query.state.status === 'success' && query.meta?.persist !== false,
        },
      }}>
      <AuthProvider>
      <StatusBar style="dark" />
      <ThemeProvider value={navigationTheme}>
        <Stack screenOptions={stackOptions}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* iOS: the photo runs to the top under a floating glass back button. */}
          <Stack.Screen
            name="services/[slug]"
            options={{ title: '', headerTransparent: Platform.OS === 'ios' }}
          />
          <Stack.Screen name="team" options={{ title: 'Our Team', ...largeTitle }} />
          <Stack.Screen name="about" options={{ title: 'About Us', ...largeTitle }} />
          <Stack.Screen name="contact" options={{ title: 'Contact Us', ...largeTitle }} />
          <Stack.Screen name="callback" options={{ title: 'Book a Callback' }} />
          <Stack.Screen name="new-referral" options={{ title: 'New Referral' }} />
          {/* Sheets: swipe down to close on iOS. */}
          <Stack.Screen name="care-finder" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </ThemeProvider>
      {/* Plays over the first screen, then fades to reveal it. */}
      {!splashDone && <BrandSplash onDone={finishSplash} />}
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
