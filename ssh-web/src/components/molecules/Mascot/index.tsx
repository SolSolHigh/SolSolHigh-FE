import React from 'react';
import { MascotProps } from './Mascot.types';
import { Typography } from '../../atoms/Typography';
import { mascotImgStyles, mascotStyles } from './Mascot.styles';

export const Mascot = ({
  children,
  platform,
  nickname,
  ment,
  classNameStyles,
}: MascotProps) => {
  return (
    <div className={`${mascotStyles()} ${classNameStyles}`}>
      <img
        src={`/assets/${platform === 'W' ? 'mascot.png' : 'mascot_top.png'}`}
        className={`${mascotImgStyles({ platform })}`}
      />
      <div>
        <Typography color="dark" size={platform === 'W' ? 'md' : 'sm'}>
          <Typography
            color="dark"
            weight="bold"
            size={platform === 'W' ? '7xl' : 'md'}
            classNameStyles="inline"
          >
            {nickname}
          </Typography>
          님,
        </Typography>
        <Typography
          color="dark"
          size={platform === 'W' ? 'md' : 'sm'}
          classNameStyles={`${platform === 'W' ? 'mt-4' : 'mt-2'}`}
        >
          {ment}
        </Typography>
        {children}
      </div>
    </div>
  );
};
