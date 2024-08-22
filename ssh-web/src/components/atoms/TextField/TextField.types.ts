export type TVariant = 'outlined' | 'standard';
export type TState = 'primary' | 'secondary' | 'danger' | 'unfocused';
export type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TextFieldProps {
  variant?: TVariant;
  state?: TState;
  size?: TSize;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameStyles?: string;
}