import React from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MarketFetch } from './MarketFetch';
import { LoadingSkeleton } from '../Mission/children/LoadingSkeleton';

export const Market = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<LoadingSkeleton />}>
        <MarketFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
