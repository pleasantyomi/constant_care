import { Text as RNText, type TextProps } from 'react-native';
import { cn } from '@/lib/cn';

// Text styles that recur across the website, by role. Weights are separate
// font families (font-sans-bold, …) because React Native picks a font file
// by family name; see packages/tokens.
const variants = {
  // Paragraphs: text-sm leading-relaxed text-muted-foreground
  body: 'font-sans text-sm leading-relaxed text-muted-foreground',
  // Section eyebrow. accent-text is the darker teal that passes contrast;
  // the brand teal is for icons and fills.
  eyebrow: 'font-sans-bold text-xs uppercase tracking-widest text-accent-text',
  // App screen titles (the redesign's large, heavy headings).
  display: 'font-sans-heavy text-3xl leading-tight tracking-tight text-foreground',
  // Section heading: text-2xl bold leading-snug text-primary
  heading: 'font-sans-bold text-2xl leading-snug text-primary',
  // Card title: text-lg bold text-foreground
  title: 'font-sans-bold text-lg text-foreground',
  label: 'font-sans-medium text-sm text-foreground',
  caption: 'font-sans text-xs text-muted-foreground',
} as const;

export type TextVariant = keyof typeof variants;

export function Text({
  variant = 'body',
  className,
  ...props
}: TextProps & { variant?: TextVariant; className?: string }) {
  return <RNText className={cn(variants[variant], className)} {...props} />;
}
