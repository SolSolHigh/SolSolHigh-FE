import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

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

  return (
    <div className="w-full h-full min-h-[100vh]">
      {isModalOpen && <BackdropFilter />}
      <NavigationBar />
      <div
        className={`${size === 'M' || size === 'T' ? 'pb-24' : 'pb-0 pt-16'} BODY-LAYOUT relative h-max min-h-[100vh] flex flex-1 justify-center`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
