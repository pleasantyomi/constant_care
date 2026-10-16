import type { ComponentType } from 'react';
import { Image, type ImageProps } from 'expo-image';
import { withUniwind } from 'uniwind';

// expo-image (disk caching, fade-in) with className support. Third-party
// components need withUniwind to accept className.
export const RemoteImage = withUniwind(Image) as ComponentType<
  ImageProps & { className?: string }
>;
