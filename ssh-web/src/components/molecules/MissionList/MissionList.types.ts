import { IMission } from '../../../interfaces/missionInterface';

export interface IMissionListProps {
  missions: IMission[];
  role: 'parent' | 'child';
}
