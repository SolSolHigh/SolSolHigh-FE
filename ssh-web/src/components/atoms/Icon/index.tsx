import React from 'react';
import { IconProps } from './Icon.types';
import { iconStyles } from './Icon.styles';

const Icon = ({
  children,
  size = 'md',
  color = 'primary',
  classNameStyles,
}: IconProps) => {
  const iconStyle = iconStyles({
    color,
    size,
  });
  return <span className={`${iconStyle} ${classNameStyles}`}>{children}</span>;
};

export default Icon;
