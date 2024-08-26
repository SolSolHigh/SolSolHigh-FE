import React from 'react';
import { IDividerProps } from './Divider.types';
import { dividerStyles } from './Divider.styles';

export const Divider: React.FC<IDividerProps> = ({
  color = 'light',
  thickness = 'thin',
  classNameStyles = '',
}) => {
  return (
    <div
      className={`${dividerStyles({ color, thickness })} ${classNameStyles}`}
      aria-hidden="true"
    />
  );
};
