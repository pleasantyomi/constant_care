import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Path } from 'react-native-svg';
import { brand, motion } from '@constant-care/tokens';
import { brandMark } from '@constant-care/shared';
import { color } from '@/lib/theme';

// The app's version of the website's brand loader (components/shared/
// loader.tsx): the full-colour mark on white, the heart doing one double
// beat, then a fade into the app. It replaces the native splash
// (app.json) seamlessly because both show the same mark at the same size
// and position on the same white background.

// Matches the native splash: app.json `imageWidth` 160, with splash-icon.png
// being the mark filling the image's height.
export const SPLASH_MARK_HEIGHT = 160;
const MARK_WIDTH = SPLASH_MARK_HEIGHT * (brandMark.width / brandMark.height);

// Centre of the heart, so it beats in place (measured from brandMark.heart:
// x 534–969, y 574–954 in the viewBox), converted to points at the drawn
// size. Numbers, not a '50.1% 45%' string: React Native's string parser
// misreads long decimals there and throws.
const HEART_ORIGIN: [number, number, number] = [
  (751.9 / brandMark.width) * MARK_WIDTH,
  (764 / brandMark.height) * SPLASH_MARK_HEIGHT,
  0,
];

// Time to hold the still mark after the beat, before fading out.
const HOLD_MS = 150;

const ease = Easing.inOut(Easing.ease);

export function BrandSplash({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const heartScale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // This view is now on screen and looks identical to the native splash.
    SplashScreen.hideAsync();

    const { durationMs, keyframes } = motion.heartbeat;
    const beatMs = reduceMotion ? 0 : durationMs;
    if (!reduceMotion) {
      // Step through the shared keyframes: [fraction, scale] pairs.
      const steps = keyframes.slice(1).map(([at, scale], i) =>
        withTiming(scale, { duration: (at - keyframes[i][0]) * durationMs, easing: ease }),
      );
      heartScale.value = withSequence(...steps);
    }
    opacity.value = withDelay(
      beatMs + HOLD_MS,
      withTiming(0, { duration: motion.loaderFadeMs, easing: ease }),
    );
    const done = setTimeout(onDone, beatMs + HOLD_MS + motion.loaderFadeMs);
    return () => clearTimeout(done);
  }, [reduceMotion, heartScale, opacity, onDone]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: heartScale.value }] }));

  return (
    <Animated.View
      pointerEvents="none"
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${brand.shortName}, loading`}
      style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}>
      <View style={{ width: MARK_WIDTH, height: SPLASH_MARK_HEIGHT }}>
        <Svg width={MARK_WIDTH} height={SPLASH_MARK_HEIGHT} viewBox={brandMark.viewBox}>
          <Path d={brandMark.shield.d} fill={color.primary} transform={brandMark.shield.transform} />
        </Svg>
        {/* The heart sits in its own layer on top so it can scale around its centre. */}
        <Animated.View style={[StyleSheet.absoluteFill, { transformOrigin: HEART_ORIGIN }, heartStyle]}>
          <Svg width={MARK_WIDTH} height={SPLASH_MARK_HEIGHT} viewBox={brandMark.viewBox}>
            <G transform={brandMark.heart.transform}>
              <Path d={brandMark.heart.d} fill={color.accent} />
            </G>
          </Svg>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.background,
    zIndex: 100,
  },
});
