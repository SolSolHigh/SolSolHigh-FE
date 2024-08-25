import React, { useCallback, useRef, useState } from 'react';
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
      return isFloating ? '-translate-y-4' : 'translate-y-3';
    case 'lg':
      return isFloating ? '-translate-y-3' : 'translate-y-3';
    case 'xl':
      return isFloating ? '-translate-y-4' : 'translate-y-3';
  }
};

const TextField = ({
  inputType = 'text',
  variant = 'outlined',
  state = 'primary',
  size = 'md',
  label = '라벨',
  defaultValue = '',
  disabled = false,
  readonly = false,
  fullWidth = false,
  onChange,
  onPageHandler,
  classNameStyles,
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);
  const [isFloating, setIsFloating] = useState<boolean>(defaultValue !== '');
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsFloating(() => focused || e.target.value !== '');
      if (onChange) onChange(e);
    },
    [focused],
  );
  const handleFocus = useCallback(() => {
    setFocused(true);
    setIsFloating(true);
  }, [focused]);
  const handleBlur = useCallback(() => {
    setFocused(false);
    setIsFloating(inputRef.current?.value !== '');
  }, [focused]);

  const translateValue = getTranslateValue(size, isFloating);

  return (
    <div
      className={`relative mb-4 ${fullWidth ? 'w-full' : ''} 
          ${classNameStyles} `}
      onClick={onPageHandler}
    >
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
        ref={inputRef}
        type={inputType}
        className={`bg-transparent outline-none text-black  
          ${inputClassName}
        ${variant === 'outlined' ? 'pt-4 pb-2 border-2 rounded' : 'pt-2 pb-1'} 
        ${isFloating ? '' : 'border-secondary-400'}
        `}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readonly}
      />
    </div>
  );
};

export default TextField;
