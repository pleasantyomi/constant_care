import { createContext, useContext, type ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from './text';

// Gives the control inside a Field its label and error, so screen readers
// announce "Your Name" rather than just the placeholder (React Native has no
// <label for>). Input and Select read this.
const FieldContext = createContext<{ label: string; error?: string } | null>(null);
export const useFieldContext = () => useContext(FieldContext);

// Label + control + error, the website's `grid gap-1.5` form field.
export function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <FieldContext.Provider value={{ label: optional ? `${label} (optional)` : label, error }}>
      <View className="gap-1.5">
        {/* Hidden from screen readers: the control announces the label itself. */}
        <Text variant="label" importantForAccessibility="no" accessibilityElementsHidden>
          {label}
          {optional && <Text variant="caption"> (optional)</Text>}
        </Text>
        {children}
        {error && (
          <Text variant="caption" className="text-destructive" accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
    </FieldContext.Provider>
  );
}
