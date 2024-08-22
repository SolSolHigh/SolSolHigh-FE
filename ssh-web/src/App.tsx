import './App.css';
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getExample2 } from './apis/exampleApi';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/organisms/NavigationBar';

function App() {
  // ============= Example Test ======================
  const exampleQuery = useSuspenseQuery({
    queryKey: ['example'],
    queryFn: async () => await getExample2(),
  });

  if (exampleQuery.error && !exampleQuery.isFetching) {
    throw exampleQuery.error;
  }
  // ============= Example Test ======================

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-4">
          <NavigationBar />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
