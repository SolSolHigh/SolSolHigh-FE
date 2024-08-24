import { ICircularImageProps } from '../../atoms/CircularImage/CircularImage.types';
import {
  TTypographySize,
  TTypographyWeight,
} from '../../atoms/Typography/Typography.types';

export interface IAvatarWithLabelProps extends ICircularImageProps {
  label: string;
  labelSize?: TTypographySize;
  labelWeight?: TTypographyWeight;
  labelColor?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'dark'
    | 'light';
}
