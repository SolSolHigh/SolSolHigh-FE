import React from 'react';
import { ICircularImageProps } from './CircularImage.types';
import { circularImageStyles } from './CircularImage.styles';

export const CircularImage = ({
  imageUrl,
  altText,
  size = 'md',
  bgColor = 'blue',
  classNameStyles,
  children,
}: ICircularImageProps) => {
  const className = circularImageStyles({ size, bgColor });

  return (
    <div className={`relative ${className} ${classNameStyles}`}>
      <img
        src={imageUrl}
        alt={altText}
        className="rounded-full object-cover w-full h-full"
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
