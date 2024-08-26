import React from 'react';
import { MascotCardProps } from './MascotCard.types';
import { CircularImage } from '../../atoms/CircularImage';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { HiTrash } from 'react-icons/hi2';

export const MascotCard = ({
  childInfo,
  children,
  classNameStyles,
}: MascotCardProps) => {
  return (
    <div className="relative flex items-center w-full p-4 rounded-md shadow-sm">
      <CircularImage
        imageUrl="/assets/images/samples/children/boy1.png"
        altText="boy1"
        size="xl"
      />
      <div className="flex flex-col justify-between ml-4 gap-y-2">
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {childInfo.name}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {childInfo.nickname}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography color="dark" size="sm">
            {childInfo.birthday}
          </Typography>
        </div>
      </div>
      <Icon
        color="danger"
        classNameStyles="absolute right-4 top-4 mob:right-2 mob:top-2"
      >
        <HiTrash />
      </Icon>
    </div>
  );
};
