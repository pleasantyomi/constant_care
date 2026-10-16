import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Same helper as the website's lib/utils.ts: later classes win on conflict.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
