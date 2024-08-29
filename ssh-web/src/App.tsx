import './App.css';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from './components/organisms/NavigationBar';
import BackdropFilter from './components/atoms/BackdropFilter';
import { useRecoilValue } from 'recoil';
import { isModalOpenState } from './atoms/modal';
import {
  useCloseModalOnRouteChange,
  useResizeDetection,
  useLockBodyScroll,
} from './hook';
import { useSessionCheck } from './hook/useSessionCheck';
import { isTarget } from './utils/appUtil';

function App() {
  useCloseModalOnRouteChange();
  useResizeDetection();
  useLockBodyScroll();
  useSessionCheck();

  const isModalOpen = useRecoilValue(isModalOpenState);
  const location = useLocation();

  return (
    <div className="w-full h-full">
      {isModalOpen.isOpen && <BackdropFilter />}
      {!isTarget(location.pathname) && <NavigationBar />}
      <div
        className={`${isTarget(location.pathname) ? 'tablet:!min-h-full' : 'tablet:mb-[4rem]'} desktop:pb-0 h-[calc(100%-3.5rem)] desktop:flex-1 relative w-full flex justify-center`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
