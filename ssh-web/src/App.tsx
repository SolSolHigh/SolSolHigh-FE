import './App.css';
import React, { useEffect } from 'react';
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
import { getNavBgColor, isTarget } from './utils/appUtil';

import 'firebase/messaging';
import { messaging } from './firebase/firebaseConfig';
import Message from './firebase/Message';
import { toast, ToastContainer } from 'react-toastify';
import { postFcmToken } from './apis/fcmApi';

function App() {
  useCloseModalOnRouteChange();
  useResizeDetection();
  useLockBodyScroll();
  useSessionCheck();

  useEffect(() => {
    messaging.onMessage((payload) => {
      console.log('payload:', payload);
      console.log('payload:', payload?.data);
      toast(<Message notification={payload.notification} />);
    });

    async function requestPermission() {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await messaging.getToken({
          vapidKey:
            'BDJk7HGqH8Z1qegjymTCaE4muy3OdG-tXYnZz5o2imS09412Xx8_YRV3TakKmsBC3eBYanW7kRxiVrRAnHEHt5I',
        });
        console.log('Token generated : ', token);
        postFcmToken(token);
      } else if (permission === 'denied') {
        alert('알림을 거절당했습니다.');
      }
    }

    requestPermission();
  }, []);

  const isModalOpen = useRecoilValue(isModalOpenState);
  const location = useLocation();

  return (
    <div className="w-full h-full">
      {isModalOpen.isOpen && <BackdropFilter />}
      {!isTarget(location.pathname) && (
        <NavigationBar
          bgColor={getNavBgColor(location.pathname)}
          path={location.pathname}
          backPath={location.pathname === '/mypage' ? '/menu' : undefined}
        />
      )}
      <div
        className={`${isTarget(location.pathname) ? 'tablet:!min-h-full' : 'tablet:mb-[4rem]'} desktop:pb-0 h-[calc(100%-3.5rem)] desktop:flex-1 relative w-full flex justify-center`}
      >
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
