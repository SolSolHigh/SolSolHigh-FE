import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { InformationFetch } from './InformationFetch';

export const Information = () => {
  return (
    <Suspense fallback={<>로딩중</>}>
      <InformationFetch />
    </Suspense>
  );
};
