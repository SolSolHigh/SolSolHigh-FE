import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

if (process.env.NODE_ENV === 'development') {
  require('./mocks');
}

const PathNames = {
  HOME: '/home',
  MISSION: '/mission',
  QUIZ: '/quiz',
  EGG: '/egg',
  MYPAGE: '/mypage',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <></>,
    children: [
      {
        index: true,
        path: '/',
        element: <></>,
      },
      {
        path: PathNames.HOME,
        element: <></>,
      },
      {
        path: PathNames.MISSION,
        element: <></>,
      },
      {
        path: PathNames.QUIZ,
        element: <></>,
      },
      {
        path: PathNames.EGG,
        element: <></>,
      },
      {
        path: PathNames.MYPAGE,
        element: <></>,
      },
    ],
  },
]);
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="bottom-right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
