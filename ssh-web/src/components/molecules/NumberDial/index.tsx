import React, { useEffect, useRef, useState } from 'react';
import { NumberDialProps } from './NumberDial.types';
import {
  containerStyles,
  numberBoxStyles,
  numberStyles,
  specifiedStyles,
} from './NumberDial.styles';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { HiPlay } from 'react-icons/hi2';

export const NumberDial = ({
  min,
  max,
  defaultNumber,
  specialNumber,
  specialMent,
  onChangeNumber,
}: NumberDialProps) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultNumber);
  const startY = useRef<number | null>(null);
  const startValue = useRef<number>(currentValue);

  const handleSelect = (selectedValue: number) => {
    if (selectedValue >= min! && selectedValue <= max!) {
      setCurrentValue(selectedValue);
      onChangeNumber?.(selectedValue);
    }
  };

  const handleDragStart = (y: number) => {
    startY.current = y;
    startValue.current = currentValue;
  };

  const handleDragMove = (y: number) => {
    if (startY.current !== null) {
      const diff = startY.current - y;
      const step = Math.round(diff / 40);
      const newValue = startValue.current + step;
      handleSelect(newValue);
    }
  };

  const handleDragEnd = () => {
    startY.current = null;
  };

  const getPosition = (position: number) => {
    if (position === -2) return '-2';
    else if (position === -1) return '-1';
    else if (position === 1) return '1';
    else if (position === 2) return '2';
    else return undefined;
  };

  useEffect(() => {
    if (currentValue > max) setCurrentValue(max);
  }, [max]);

  return (
    <div
      className={containerStyles()}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
    >
      {Array.from({ length: max! - min! + 1 }, (_, i) => i + min!).map(
        (num) => {
          const position = num - currentValue;
          if (Math.abs(position) > 2) return null;

          return (
            <div
              key={num}
              className={numberBoxStyles({ position: getPosition(position) })}
              onMouseDown={(e) => handleDragStart(e.clientY)}
              onMouseMove={(e) => handleDragMove(e.clientY)}
              onMouseUp={handleDragEnd}
            >
              <div
                className={specifiedStyles({
                  need: num === specialNumber,
                })}
              >
                <Typography
                  size={num === currentValue ? 'md' : 'xs'}
                  weight={num === currentValue ? 'bold' : 'medium'}
                  classNameStyles="text-primary-300"
                >
                  {specialMent}
                </Typography>
                <Icon
                  size="xs"
                  classNameStyles="flex justify-center items-center text-primary-300"
                >
                  <HiPlay />
                </Icon>
              </div>
              <Typography
                key={num}
                onClick={() => handleSelect(num)}
                size={num === currentValue ? 'lg' : 'sm'}
                weight={num === currentValue ? 'bold' : 'medium'}
                color={num === currentValue ? 'dark' : 'secondary'}
                classNameStyles={`${numberStyles({ selected: num === currentValue })}`}
              >
                {num}
              </Typography>
            </div>
          );
        },
      )}
    </div>
  );
};
