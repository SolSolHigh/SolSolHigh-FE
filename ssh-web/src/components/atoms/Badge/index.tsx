import React from 'react';
import { BadgeProps } from './Badge.types';
import { badgeStyles } from './Badge.styles';
import { Typography } from '../Typography';

export const Badge = ({
  text,
  color = 'primary',
  textColor = 'light',
  size = 'md',
  weight = 'light',
  startIcon,
  classNameStyles,
}: BadgeProps) => {
  const className = badgeStyles({ color, textColor, size });

  return (
    <div className={`${className} ${classNameStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      <Typography size={size} color={textColor} weight={weight}>
        {text}
      </Typography>
    </div>
  );
};
