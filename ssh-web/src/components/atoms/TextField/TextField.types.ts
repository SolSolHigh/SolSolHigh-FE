export type TTextFieldVariant = 'outlined' | 'standard';
export type TTextFieldState = 'primary' | 'secondary' | 'danger' | 'unfocused';
export type TTextFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TextFieldProps {
  variant?: TTextFieldVariant;
  state?: TTextFieldState;
  size?: TTextFieldSize;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameStyles?: string;
}
