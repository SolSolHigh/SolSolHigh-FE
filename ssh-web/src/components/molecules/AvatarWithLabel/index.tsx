import React from 'react';
import { IAvatarWithLabelProps } from './AvatarWihLabel.types';
import { CircularImage } from '../../atoms/CircularImage';
import { Typography } from '../../atoms/Typography';
import { avatarWithLabelStyles } from './AvatarWithLabel.styles';

export const AvatarWithLabel = ({
  imageUrl,
  altText,
  size = 'md',
  bgColor = 'blue',
  label,
  labelSize = 'md',
  labelWeight = 'regular',
  labelColor = 'dark',
  classNameStyles,
}: IAvatarWithLabelProps) => {
  const className = avatarWithLabelStyles();

  return (
    <div className={`${className} ${classNameStyles}`}>
      <CircularImage
        imageUrl={imageUrl}
        altText={altText}
        size={size}
        bgColor={bgColor}
      />
      <Typography size={labelSize} weight={labelWeight} color={labelColor}>
        {label}
      </Typography>
    </div>
  );
};
