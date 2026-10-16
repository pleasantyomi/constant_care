import type { ReactNode } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { motion } from '@constant-care/tokens';

// The website's FadeIn / StaggerChildren (fade up on first view). Pass
// `index` to stagger items in a list. Reanimated skips layout animations
// automatically when the OS asks for reduced motion.
export function FadeIn({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <Animated.View
      className={className}
      entering={FadeInDown.duration(motion.fadeIn.durationMs.app).delay(
        index * motion.staggerMs,
      )}>
      {children}
    </Animated.View>
  );
}
