import React from 'react';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { FormTitleProps } from './FormTitle.types';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { formTitleStyles } from './FormTitle.styles';

export const FormTitle = ({
  children,
  keyword,
  ment,
  steps,
  curStep,
  onChangeStep,
  classNameStyles,
}: FormTitleProps) => {
  return (
    <div className={`${formTitleStyles()} ${classNameStyles}`}>
      <Icon size="sm" color={curStep ? 'dark' : 'secondary'}>
        <HiArrowLeft onClick={() => curStep && onChangeStep(curStep - 1)} />
      </Icon>
      <Typography
        color="dark"
        classNameStyles="desktop:text-base tablet:text-sm"
      >
        <Typography
          weight="bold"
          classNameStyles="inline desktop:text-xl tablet:text-base"
        >
          {keyword}
        </Typography>
        {ment}
      </Typography>
      <Icon size="sm" color={curStep < steps - 1 ? 'dark' : 'secondary'}>
        <HiArrowRight
          onClick={() => curStep < steps - 1 && onChangeStep(curStep + 1)}
        />
      </Icon>
      {children}
    </div>
  );
};
