import React from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { EggFetch } from './EggFetch';
import { LoadingSkeleton } from './LoadingSkeleton';

export const Egg = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<LoadingSkeleton />}>
        <EggFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
