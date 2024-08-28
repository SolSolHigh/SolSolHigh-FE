import { IMission } from '../../../interfaces/missionInterfaces';
import { EResize } from '../../../themes/themeBase';

export interface IMissionDetailProps {
  mission: IMission;
  size: EResize;
  role: 'parent' | 'child';
}
