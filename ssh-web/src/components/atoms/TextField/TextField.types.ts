export type TTextFieldVariant = 'outlined' | 'standard';
export type TTextFieldState = 'primary' | 'secondary' | 'danger' | 'unfocused';
export type TTextFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TextFieldProps {
  inputType?: string;
  variant?: TTextFieldVariant;
  state?: TTextFieldState;
  size?: TTextFieldSize;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPageHandler?: () => void;
  classNameStyles?: string;
}
