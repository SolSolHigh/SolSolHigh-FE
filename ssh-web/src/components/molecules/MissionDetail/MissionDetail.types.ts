import { IMission } from '../../../interfaces/missionInterface';
import { EResize } from '../../../themes/themeBase';

export interface IMissionDetailProps {
  mission: IMission;
  size: EResize;
  role: 'parent' | 'child';
}
