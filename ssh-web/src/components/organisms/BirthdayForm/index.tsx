import React, { useState } from 'react';
import { BirthdayFormProps } from './BirthdayForm.types';
import { containerStyles, titleStyles } from './BirthdayForm.styles';
import { Icon } from '../../atoms/Icon';
import { HiOutlineCake } from 'react-icons/hi';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { NumberDial } from '../../molecules/NumberDial';
import dayjs from 'dayjs';

export const BirthdayForm = ({
  defaultYear,
  defaultMonth,
  defaultDay,
  handler,
  children,
  classNameStyles,
}: BirthdayFormProps) => {
  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState<number>(defaultMonth);
  const [day, setDay] = useState<number>(defaultDay);

  const onChangeNumber = (type: string) => {
    if (type === 'y') {
      return (value: number) => setYear(value);
    } else if (type === 'm') {
      return (value: number) => setMonth(value);
    } else {
      return (value: number) => setDay(value);
    }
  };
  return (
    <div className={`${containerStyles()} ${classNameStyles}`}>
      <div className={titleStyles()}>
        <Icon size="xl">
          <HiOutlineCake />
        </Icon>
        <Typography color="dark" size="xl" weight="bold">
          생일을 알려주세요
        </Typography>
      </div>
      <div className="flex w-full">
        <NumberDial
          min={dayjs(new Date()).year() - 100}
          max={dayjs(new Date()).year() + 100}
          defaultNumber={defaultYear}
          onChangeNumber={onChangeNumber('y')}
        />
        <Typography
          color="dark"
          weight="bold"
          classNameStyles="-translate-y-3.5"
        >
          년
        </Typography>
        <NumberDial
          min={0}
          max={12}
          defaultNumber={defaultMonth + 1}
          onChangeNumber={onChangeNumber('m')}
        />
        <Typography
          color="dark"
          weight="bold"
          classNameStyles="-translate-y-3.5"
        >
          월
        </Typography>
        <NumberDial
          min={1}
          max={dayjs(`${year}-${month}-01`).daysInMonth()}
          defaultNumber={defaultDay}
          onChangeNumber={onChangeNumber('d')}
        />
        <Typography
          color="dark"
          weight="bold"
          classNameStyles="-translate-y-3.5"
        >
          일
        </Typography>
      </div>
      <Button fullWidth onClick={() => handler(year, month, day)}>
        <Typography weight="semibold" color="light" size="sm">
          선택
        </Typography>
      </Button>
      {children}
    </div>
  );
};
