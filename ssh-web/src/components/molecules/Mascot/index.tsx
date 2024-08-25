import React from 'react';
import { MascotProps } from './Mascot.types';
import { Typography } from '../../atoms/Typography';
import { mascotImgStyles, mascotStyles } from './Mascot.styles';

export const Mascot = ({
  children,
  nickname,
  ment,
  classNameStyles,
}: MascotProps) => {
  return (
    <div className={`${mascotStyles()} ${classNameStyles}`}>
      <picture>
        <source
          srcSet="/assets/mascot_top.png"
          className="w-28 h-28"
          media="(max-width: 1279px)"
        />
        <img src="/assets/mascot.png" className={`${mascotImgStyles()}`} />
      </picture>
      <div>
        <Typography color="dark" size="md" classNameStyles="tablet:text-sm">
          <Typography
            color="dark"
            weight="bold"
            size="7xl"
            classNameStyles="inline tablet:text-base"
          >
            {nickname}
          </Typography>
          님,
        </Typography>
        <Typography
          color="dark"
          size="md"
          classNameStyles="tablet:text-sm desktop:mt-4 tablet:mt-2"
        >
          {ment}
        </Typography>
        {children}
      </div>
    </div>
  );
};
