import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RequestFetch } from './RequestFetch';

export const Request = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <RequestFetch />
      </Suspense>
    </ErrorBoundary>
  );
};
