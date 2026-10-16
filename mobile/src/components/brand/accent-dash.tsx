import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { motion } from '@constant-care/tokens';
import { cn } from '@/lib/cn';

// The website's teal signature dash (components/animations/accent-dash.tsx),
// drawing in from zero width. Skipped when the OS asks for reduced motion.
export function AccentDash({
  align = 'start',
  className,
}: {
  align?: 'start' | 'center';
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    scale.value = withTiming(1, {
      duration: motion.accentDash.durationMs,
      easing: Easing.out(Easing.quad),
    });
  }, [reduceMotion, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scaleX: scale.value }] }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn('h-0.5 w-10 bg-accent', align === 'center' && 'self-center', className)}
      style={[style, { transformOrigin: align === 'center' ? 'center' : 'left' }]}
    />
  );
}
