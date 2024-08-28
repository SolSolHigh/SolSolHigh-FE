import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { InformationFetch } from './InformationFetch';

export const Information = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <InformationFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
