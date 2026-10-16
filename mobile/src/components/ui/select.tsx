import { useState } from 'react';
import { FlatList, Modal, Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { cn } from '@/lib/cn';
import { color } from '@/lib/theme';
import { useFieldContext } from './field';
import { Text } from './text';

// The website uses a dropdown (components/ui/select.tsx). Phones have no
// direct equivalent, so this opens a sheet of options: iOS's native page
// sheet (swipe down to dismiss), or a bottom sheet on Android.
const iosSheet = Platform.OS === 'ios';
export function Select({
  value,
  onChange,
  options,
  placeholder,
  title,
  invalid,
}: {
  value: string | null;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  title: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const field = useFieldContext();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${field?.label ?? title}: ${value ?? placeholder}`}
        accessibilityHint={field?.error ?? 'Opens a list of options'}
        onPress={() => setOpen(true)}
        className={cn(
          'min-h-12 flex-row items-center justify-between rounded-md border border-input bg-background px-3',
          invalid && 'border-destructive',
        )}>
        <Text className={cn('font-sans text-base', value ? 'text-foreground' : 'text-muted-foreground')}>
          {value ?? placeholder}
        </Text>
        <ChevronDown size={18} color={color['muted-foreground']} />
      </Pressable>

      <Modal
        visible={open}
        animationType="slide"
        {...(iosSheet ? { presentationStyle: 'pageSheet' as const } : { transparent: true })}
        onRequestClose={() => setOpen(false)}>
        {!iosSheet && (
          <Pressable className="flex-1 bg-foreground/40" onPress={() => setOpen(false)} accessibilityLabel="Close" />
        )}
        <View
          className={cn('bg-background', iosSheet ? 'flex-1' : 'max-h-[70%] rounded-t-2xl')}
          style={{ paddingBottom: insets.bottom + 8 }}>
          <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <Text variant="title">{title}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => setOpen(false)} hitSlop={12}>
              <X size={22} color={color.foreground} />
            </Pressable>
          </View>
          <FlatList
            data={options}
            keyExtractor={(option) => option}
            renderItem={({ item }) => {
              const selected = item === value;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className={cn('min-h-12 flex-row items-center justify-between px-5 py-3', selected && 'bg-secondary')}>
                  <Text className={cn('flex-1 font-sans text-base', selected ? 'text-primary' : 'text-foreground')}>
                    {item}
                  </Text>
                  {selected && <Check size={20} color={color.accent} />}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
}
