import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MenuFetch } from './MenuFetch';

export const Menu = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <MenuFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
