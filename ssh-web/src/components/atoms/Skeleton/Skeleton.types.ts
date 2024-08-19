import React from 'react';

export type TSkeletonVariants = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: TSkeletonVariants;
  width?: string | number;
  height?: string | number;
  className?: string;
}
