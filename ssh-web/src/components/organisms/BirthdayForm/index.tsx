import React from 'react';
import { BirthdayFormProps } from './BirthdayForm.types';
import { containerStyles } from './BirthdayForm.styles';
import { Icon } from '../../atoms/Icon';
import { HiOutlineCake } from 'react-icons/hi';
import { Typography } from '../../atoms/Typography';

export const BirthdayForm = ({
  children,
  classNameStyles,
}: BirthdayFormProps) => {
  return (
    <div className={`${containerStyles()} ${classNameStyles}`}>
      <div className="flex flex-col items-center gap-y-2">
        <Icon size="xl">
          <HiOutlineCake />
        </Icon>
        <Typography color="dark" size="xl" weight="bold">
          생일을 알려주세요
        </Typography>
      </div>
      <button className="px-8 py-4 text-white rounded-md bg-primary-500">
        버튼
      </button>
      {children}
    </div>
  );
};
