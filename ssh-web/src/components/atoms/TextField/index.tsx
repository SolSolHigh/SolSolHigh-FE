import React from 'react';
import { TextFieldProps } from './TextField.types';
import { textFieldStyles,labelStyles } from './TextField.styles';

const TextField: React.FC<TextFieldProps> = ({ variant, state, size, label, value, onChange, classNameStyles, }) => {
  const inputClassName = textFieldStyles({ variant, state, size });
  const labelClassName = labelStyles({ state, size});

  return (
    <div className="mb-4">
      { state !== 'unfocused' && 
        <label className={labelClassName}>
          {label}
        </label>
      }
        <input
          type="text"
          className={`bg-transparent outline-none text-black
          ${inputClassName} 
          ${classNameStyles}`}
          value={value}
          onChange={onChange}
          placeholder={label}
        />
    </div>
  );
};

export default TextField;
