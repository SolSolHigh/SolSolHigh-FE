import React from 'react';
import { ProfileIconProps } from './ProfileIcon.types';
import { profileIconStyles } from './ProfileIcon.styles';

export const ProfileIcon = ({
  children,
  size = 'md',
  weight = 'regular',
  classNameStyles,
}: ProfileIconProps) => {
  const profileIconStyle = profileIconStyles({
    size,
    weight,
  });

  return (
    <div>
      <img
        src="./abc.png"
        className={`${profileIconStyle} ${classNameStyles}`}
      />
      <div className={`${profileIconStyle} ${classNameStyles}`}>{children}</div>
    </div>
  );
};
