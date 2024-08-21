import './App.css';
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getExample2 } from './apis/exampleApi';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
  /*const {
    data: examplesData,
    isLoading: isExamplesLoading,
    error: examplesError,
  } = useQuery<ExampleResponse>({
    queryKey: ['examples'],
    queryFn: getExamples,
    staleTime: 1000 * 60,
  });

  if (examplesError) {
    console.error('Error fetching examples:', examplesError);
  }*/

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
    <Routes>
      {/* 홈화면 */}
      <Route path="/" element={<Home />} />

      {/* 인증/인가 */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
