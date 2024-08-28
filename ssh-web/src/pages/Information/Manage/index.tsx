import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ManageChildFetch } from './ManageChildFetch';
import { useLocation } from 'react-router-dom';
import { ManageParentFetch } from './ManageParentFetch';

export const Manage = () => {
  const location = useLocation();
  return (
    <>
      {location.state?.type === 'PARENT' && (
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <ManageChildFetch />
          </Suspense>
        </ErrorBoundary>
      )}
      {location.state?.type === 'CHILD' && (
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <ManageParentFetch />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};
