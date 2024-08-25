export interface IToggleTabProps {
  activeTab: number;
  onTabChange: (index: number) => void;
  labels: string[];
  outlined?: boolean;
  color?: 'primary' | 'dark' | 'danger';
}
