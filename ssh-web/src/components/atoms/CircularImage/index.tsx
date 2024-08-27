import React from 'react';
import { ICircularImageProps } from './CircularImage.types';
import { circularImageStyles } from './CircularImage.styles';

export const CircularImage = ({
  imageUrl,
  altText,
  size = 'md',
  imgWidth = '100%',
  bgColor = 'blue',
  classNameStyles,
  children,
}: ICircularImageProps) => {
  const className = circularImageStyles({ size, bgColor });

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className} ${classNameStyles}`}
      style={{ borderRadius: '50%' }}
    >
      <img
        src={imageUrl}
        alt={altText}
        style={{ width: imgWidth, objectFit: 'cover' }}
        className="rounded-full"
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
