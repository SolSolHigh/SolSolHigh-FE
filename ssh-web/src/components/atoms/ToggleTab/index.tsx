import React from 'react';
import { IToggleTabProps } from './ToggleTab.types';
import {
  toggleTabContainerStyles,
  toggleTabStyles,
  tabButtonStyles,
  sliderStyles,
} from './ToggleTab.styles';
import { Typography } from '../Typography';

export const ToggleTab = ({
  activeTab,
  onTabChange,
  labels,
  outlined = false,
  color = 'dark',
}: IToggleTabProps) => {
  return (
    <div className={toggleTabContainerStyles()}>
      <div className={toggleTabStyles({ outlined, color })}>
        <div
          className={sliderStyles({
            activeTab: activeTab as 0 | 1,
            outlined,
            color,
          })}
        />
        {labels.map((label, index) => (
          <button
            key={label}
            className={tabButtonStyles({
              isActive: index === activeTab,
              outlined,
              color,
            })}
            onClick={() => onTabChange(index)}
          >
            <Typography
              size="md"
              weight="regular"
              color={
                index === activeTab ? (outlined ? color : 'light') : 'secondary'
              }
              classNameStyles="transition-all duration-300"
            >
              {label}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
};
