import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

// The website's recurring card: white, 1px border, radius lg, subtle shadow.
export function Card({ className, ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('rounded-lg border border-border bg-card p-6 shadow-sm', className)}
      {...props}
    />
  );
}
