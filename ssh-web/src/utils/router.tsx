import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import { IPathNames } from '../interfaces/routerInterface';
import { QuizSolving } from '../pages/QuizSolving';

export const PathNames: IPathNames = {
  HOME: {
    path: '/home',
    name: '홈',
  },
  MISSION: {
    path: '/mission',
    name: '미션',
  },
  QUIZ: { path: '/quiz', name: '퀴즈' },
  EGG: { path: '/egg', name: '계란' },
  MYPAGE: {
    path: '/mypage',
    name: '전체',
  },
};

export const router = createBrowserRouter([
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
        path: PathNames.HOME.path,
        element: <Home />,
      },
      {
        path: PathNames.MISSION.path,
        element: <></>,
      },
      {
        path: PathNames.QUIZ.path,
        element: <QuizSolving/>,
      },
      {
        path: PathNames.EGG.path,
        element: <></>,
      },
      {
        path: PathNames.MYPAGE.path,
        element: <></>,
      },
    ],
  },
]);
