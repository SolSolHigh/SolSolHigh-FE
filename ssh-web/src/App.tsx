import './App.css';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import NavigationBar from './components/organisms/NavigationBar';
import BackdropFilter from './components/atoms/BackdropFilter';

import { useRecoilValue } from 'recoil';
import { resizeState } from './atoms/resize';
import { isModalOpenState } from './atoms/modal';
import {
  useCloseModalOnRouteChange,
  useResizeDetection,
  useLockBodyScroll,
} from './hook';

function App() {
  useCloseModalOnRouteChange();
  useResizeDetection();
  useLockBodyScroll();

  const isModalOpen = useRecoilValue(isModalOpenState);
  const size = useRecoilValue(resizeState);
  const location = useLocation();

  return (
    <div className="w-full h-full">
      {isModalOpen && <BackdropFilter />}
      {!(location.pathname === '/login' || location.pathname === '/signup') && (
        <NavigationBar />
      )}
      <div
        className={`${size === 'M' || size === 'T' ? (location.pathname === '/login' || location.pathname === '/signup' ? 'pb-0' : 'pb-16') : 'pb-0'} BODY-LAYOUT relative w-full h-full flex flex-1 justify-center`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
