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

export const NumberDial: React.FC<NumberDialProps> = ({
  min,
  max,
  defaultNumber,
  specialNumber,
  specialMent,
  onChangeNumber,
  labels,
  visibleCount = 5,
  classNameStyles = '',
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultNumber);
  const startY = useRef<number | null>(null);
  const startValue = useRef<number>(currentValue);

  const handleSelect = (selectedValue: number) => {
    if (selectedValue >= min && selectedValue <= max) {
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

  const getPosition = (
    position: number,
  ): '-2' | '-1' | '1' | '2' | undefined => {
    if (position === 0) return undefined;
    const absPosition = Math.abs(position);
    if (absPosition <= 2) {
      return position.toString() as '-2' | '-1' | '1' | '2';
    }
    return undefined;
  };

  useEffect(() => {
    if (currentValue > max) setCurrentValue(max);
    if (currentValue < min) setCurrentValue(min);
  }, [currentValue, max, min]);

  const generateNumbersToDisplay = () => {
    const half = Math.floor(visibleCount / 2);
    let start = currentValue - half;
    let end = currentValue + half;

    if (start < min) {
      end += min - start;
      start = min;
    }

    if (end > max) {
      start -= end - max;
      end = max;
    }

    const numbers = [];
    for (let i = start; i <= end; i++) {
      if (i >= min && i <= max) {
        numbers.push(i);
      }
    }
    return numbers;
  };

  const numbersToDisplay = generateNumbersToDisplay();

  return (
    <div
      className={`${containerStyles()} ${classNameStyles}`}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.clientY)}
      onMouseMove={(e) => {
        if (startY.current !== null) {
          e.preventDefault();
          handleDragMove(e.clientY);
        }
      }}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      {...rest}
    >
      {numbersToDisplay.map((num) => {
        const position = num - currentValue;
        const positionClass = getPosition(position);

        return (
          <div
            key={num}
            className={numberBoxStyles({ position: positionClass })}
            onClick={() => handleSelect(num)}
          >
            {num === specialNumber && specialMent && (
              <div className={specifiedStyles({ need: true })}>
                <Typography
                  size={num === currentValue ? 'sm' : 'xs'}
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
            )}
            <Typography
              size={num === currentValue ? 'lg' : 'sm'}
              weight={num === currentValue ? 'bold' : 'medium'}
              color={num === currentValue ? 'dark' : 'secondary'}
              classNameStyles={`${numberStyles({ selected: num === currentValue })}`}
            >
              {labels && labels[num - min] ? labels[num - min] : num}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
