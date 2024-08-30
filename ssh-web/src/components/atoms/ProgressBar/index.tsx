import React, { useState, useEffect } from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import { barStyles } from './ProgressBar.styles';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  color = 'primary',
  size = 'md',
  fullWidth,
  classNameStyles,
}: ProgressBarProps) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1250;
    const stepTime = Math.abs(Math.floor(duration / percent));

    const step = () => {
      start += 1;
      setAnimatedPercent(Math.min(start, percent));
      if (start < percent) {
        timeoutId = setTimeout(step, stepTime);
      }
    };

    let timeoutId = setTimeout(step, stepTime);

    return () => clearTimeout(timeoutId);
  }, [percent]);

  const className = barStyles({
    size: size,
    fullWidth,
  });

  const barColor = barStyles({
    color: color,
  });

  return (
    <div
      className={`relative ${className} bg-secondary-400 rounded-full overflow-hidden ${classNameStyles}`}
    >
      <div
        className={`absolute h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
        style={{ width: `${animatedPercent}% ` }}
      >
        {animatedPercent > 3 && (
          <span className="flex justify-center items-center h-full font-bold text-xs text-white">
            {animatedPercent}%
          </span>
        )}
      </div>
    </div>
  );
};
