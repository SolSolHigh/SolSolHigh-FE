import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HomeFetch } from './HomeFetch';

export const Home = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <HomeFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
