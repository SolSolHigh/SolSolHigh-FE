import { ReactNode } from 'react';
import { IChildExperience } from '../../../interfaces/experienceInterface';

export interface LevelCardProps {
  info: IChildExperience;
  children?: ReactNode;
  classNameStyles?: string;
}
