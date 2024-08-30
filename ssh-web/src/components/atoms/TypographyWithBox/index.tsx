import React from 'react';
import { Typography } from '../Typography';
import { TypographyWithBoxProps } from './TypographyWithBox.types';

export const TypographyWithBox = ({
  number,
  numberSize = '2xl',
  withBox = true,
}: TypographyWithBoxProps) => {
  return (
    <div
      className={`p-2 ${withBox ? 'bg-secondary-200 rounded-md' : 'bg-white'}`}
    >
      <Typography weight="bold" color="dark" size={numberSize}>
        {number}
      </Typography>
    </div>
  );
};
