import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { IPathNames } from '../interfaces/routerInterface';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { QuizMain } from '../pages/QuizMain';
import { QuizSolving } from '../pages/QuizSolving';
import { Mission } from '../pages/Mission';
import { Information } from '../pages/Information';
import { Manage } from '../pages/Information/Manage';
import { PromiseTicket } from '../pages/Promise';
import { Request } from '../pages/Information/Request';
import { Home } from '../pages/Home';
import { Menu } from '../pages/Menu';

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
  LOGIN: { path: '/login', name: '로그인' },
  SIGNUP: { path: '/signup', name: '회원가입' },
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
        element: <Home />,
      },
      {
        path: PathNames.HOME.path,
        element: <Home />,
      },
      {
        path: PathNames.MISSION.path,
        element: <Mission />,
      },
      {
        path: PathNames.QUIZ.path,
        element: <QuizMain />,
      },
      {
        path: PathNames.QUIZ.path + '/solve',
        element: <QuizSolving />,
      },
      {
        path: PathNames.EGG.path,
        element: <></>,
      },
      {
        path: PathNames.MYPAGE.path,
        element: <Information />,
      },

      {
        path: '/manage',
        element: <Manage />,
      },
      {
        path: '/promise',
        element: <PromiseTicket />,
      },
      {
        path: '/request',
        element: <Request />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
    ],
  },
  {
    path: PathNames.LOGIN.path,
    element: <Login />,
  },
  {
    path: PathNames.SIGNUP.path,
    element: <Signup />,
  },
]);
