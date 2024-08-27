import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ManageFetch } from './ManageFetch';

export const Manage = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <ManageFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
