import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/cn';
import { color } from '@/lib/theme';
import { useFieldContext } from './field';

// Mirrors components/ui/input.tsx: input border, radius md, teal focus ring.
export function Input({
  className,
  invalid,
  multiline,
  ...props
}: TextInputProps & { className?: string; invalid?: boolean }) {
  const [focused, setFocused] = useState(false);
  const field = useFieldContext();
  return (
    <TextInput
      placeholderTextColor={color['muted-foreground']}
      accessibilityLabel={field?.label}
      accessibilityHint={field?.error}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      className={cn(
        'min-h-12 rounded-md border border-input bg-background px-3 font-sans text-base text-foreground',
        multiline && 'min-h-28 py-3',
        focused && 'border-ring',
        invalid && 'border-destructive',
        className,
      )}
      onFocus={(event) => {
        setFocused(true);
        props.onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        props.onBlur?.(event);
      }}
      {...props}
    />
  );
}
