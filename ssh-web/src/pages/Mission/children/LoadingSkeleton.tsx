import React from 'react';
import { Skeleton } from '../../../components/atoms/Skeleton';

export const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex items-center justify-between p-4">
        <Skeleton variant="circular" width={64} height={64} />
        <div className="flex-1 ml-4">
          <Skeleton width="50%" />
          <Skeleton width="30%" className="mt-2" />
        </div>
        <Skeleton variant="rectangular" width={24} height={24} />
      </div>
    ))}
  </div>
);
