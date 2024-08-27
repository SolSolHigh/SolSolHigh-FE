import { IMission } from '../../../interfaces/missionInterfaces';

export interface IMissionListProps {
  missions: IMission[];
  role: 'parent' | 'child';
}
