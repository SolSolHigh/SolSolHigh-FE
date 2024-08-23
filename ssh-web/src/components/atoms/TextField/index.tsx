import React, { useState } from 'react';
import { TTextFieldSize, TextFieldProps } from './TextField.types';
import { textFieldStyles, labelStyles } from './TextField.styles';

// size에 따른 위치 조정 함수
const getTranslateValue = (size: TTextFieldSize, isFloating: boolean) => {
  switch (size) {
    case 'xs':
      return isFloating ? '-translate-y-2' : 'translate-y-3';
    case 'sm':
      return isFloating ? '-translate-y-3' : 'translate-y-3';
    case 'md':
      return isFloating ? '-translate-y-3' : 'translate-y-3';
    case 'lg':
      return isFloating ? '-translate-y-3' : 'translate-y-3';
    case 'xl':
      return isFloating ? '-translate-y-4' : 'translate-y-3';
  }
};

const TextField = ({
  variant = 'outlined',
  state = 'primary',
  size = 'md',
  label = '라벨',
  defaultValue = '',
  disabled = false,
  fullWidth = false,
  onChange,
  classNameStyles,
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || defaultValue !== '';

  const inputClassName = textFieldStyles({
    variant,
    state: isFloating ? state : 'unfocused',
    size,
    fullWidth,
    disabled,
  });
  const labelClassName = labelStyles({
    state: isFloating ? state : 'unfocused',
    size,
  });

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const translateValue = getTranslateValue(size, isFloating);

  return (
    <div className={`relative mb-4 ${fullWidth ? 'w-full' : ''}`}>
      <label
        className={`
          ${labelClassName}
          absolute 
          left-2 
          transition-all 
          duration-200
          transform 
          scale-90
          ${translateValue}
          ${variant === 'outlined' && isFloating ? 'bg-white px-1 z-20' : ''}
          `}
      >
        {label}
      </label>
      <input
        type="text"
        className={`bg-transparent outline-none text-black  
          ${inputClassName}
          ${classNameStyles} 
        ${variant === 'outlined' ? 'pt-4 pb-2 border-2 rounded' : 'pt-2 pb-1'} 
        ${isFloating ? '' : 'border-secondary-400'}
        `}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default TextField;
