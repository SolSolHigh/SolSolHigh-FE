import React from 'react';
import { skeletonStyles } from './Skeleton.styles';
import { SkeletonProps } from './Skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height,
  className = '',
}) => {
  const style = {
    width,
    height: height || (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={`${skeletonStyles({ variant })} ${className}`}
      style={style}
    />
  );
};
