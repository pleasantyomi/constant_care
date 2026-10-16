import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, View, type PressableProps } from 'react-native';
import { cn } from '@/lib/cn';
import { color } from '@/lib/theme';
import { Text } from './text';

// Mirrors components/ui/button.tsx on the website. The one deliberate
// difference: 48pt minimum height, because the website's 36px is too small
// for touch.
const containers = {
  default: 'bg-primary',
  outline: 'border border-border bg-background',
  secondary: 'bg-secondary',
  ghost: 'bg-transparent',
  accent: 'bg-accent',
  destructive: 'bg-destructive/10',
  // On blue banners: the website hero's white and outlined buttons.
  inverse: 'bg-white',
  'inverse-outline': 'border border-white/60 bg-transparent',
} as const;

const labels = {
  default: 'text-primary-foreground',
  outline: 'text-foreground',
  secondary: 'text-secondary-foreground',
  ghost: 'text-foreground',
  accent: 'text-accent-foreground',
  destructive: 'text-destructive',
  inverse: 'text-primary',
  'inverse-outline': 'text-white',
} as const;

const spinnerColors: Record<keyof typeof labels, string> = {
  default: color['primary-foreground'],
  outline: color.foreground,
  secondary: color['secondary-foreground'],
  ghost: color.foreground,
  accent: color['accent-foreground'],
  destructive: color.destructive,
  inverse: color.primary,
  'inverse-outline': '#FFFFFF',
};

export type ButtonVariant = keyof typeof containers;

export function Button({
  variant = 'default',
  children,
  icon,
  loading = false,
  disabled,
  className,
  ...props
}: Omit<PressableProps, 'children'> & {
  variant?: ButtonVariant;
  children: string;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
}) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(
        'min-h-12 flex-row items-center justify-center gap-2 rounded-md px-5',
        containers[variant],
        isDisabled && 'opacity-50',
        className,
      )}
      style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColors[variant]} />
      ) : (
        icon && <View>{icon}</View>
      )}
      <Text variant="label" className={labels[variant]}>
        {children}
      </Text>
    </Pressable>
  );
}
