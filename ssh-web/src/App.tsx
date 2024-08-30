import './App.css';
import React, { useEffect } from 'react';
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

import firebase from 'firebase/app'; // Firebase needs to be imported like this in v8
import 'firebase/messaging'; // Import messaging module in v8
import { messaging } from './firebase/firebaseConfig';
import Message from './firebase/Message';
import { toast, ToastContainer } from 'react-toastify';
import { postFcmToken } from './apis/fcmApi';

function App() {
  useCloseModalOnRouteChange();
  useResizeDetection();
  useLockBodyScroll();

  useEffect(() => {
    // Handle incoming messages in the foreground
    messaging.onMessage((payload) => {
      toast(<Message notification={payload.notification} />);
    });

    async function requestPermission() {
      // Requesting permission using the Notification API
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await messaging.getToken({
          vapidKey:
            'BDJk7HGqH8Z1qegjymTCaE4muy3OdG-tXYnZz5o2imS09412Xx8_YRV3TakKmsBC3eBYanW7kRxiVrRAnHEHt5I',
        });
        // We can send token to the server
        console.log('Token generated : ', token);
        postFcmToken(token);
      } else if (permission === 'denied') {
        // Notifications are blocked
        alert('You denied the notification');
      }
    }

    requestPermission();
  }, []);

  const isModalOpen = useRecoilValue(isModalOpenState);
  const size = useRecoilValue(resizeState);
  const location = useLocation();

  return (
    <div className="w-full h-full">
      {isModalOpen.isOpen && <BackdropFilter />}
      {!(
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/mypage' ||
        location.pathname === '/manage' ||
        location.pathname === '/quiz/solve' ||
        location.pathname === '/request'
      ) && <NavigationBar />}
      <div
        className={`${size === 'M' || size === 'T' ? (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/mypage' || location.pathname === '/manage' || location.pathname === '/quiz/solve' || location.pathname === '/request' ? '!min-h-full' : 'pb-[4rem]') : 'pb-0'} BODY-LAYOUT h-[calc(100%-3.5rem)] desktop:flex-1 relative w-full flex justify-center`}
      >
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
