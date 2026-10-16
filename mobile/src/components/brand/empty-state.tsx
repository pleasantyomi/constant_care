import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { IconRing } from './icon-ring';

// Mirrors the website's empty states (Careers "no openings", Our Team
// "coming soon"): calm-mist panel, icon ring, message, optional action.
export function EmptyState({
  icon,
  message,
  action,
}: {
  icon: LucideIcon;
  message: string;
  action?: ReactNode;
}) {
  return (
    <View className="items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-8">
      <IconRing icon={icon} />
      <Text className="text-center">{message}</Text>
      {action}
    </View>
  );
}
