import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestForToken, onMessageListener } from './firebase';
import { postFcmToken } from './apis/fcmApi';
// import { getMessaging, onMessage } from 'firebase/messaging';

const FCMNotification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });

  const notify = () => {
    toast.info(
      <div>
        <p>
          <b>{notification.title}</b>
        </p>
        <p>{notification.body}</p>
      </div>,
      {
        position: 'top-right',
        autoClose: 5000,
      },
    );
  };

  useEffect(() => {
    if (notification.title) {
      notify();
    }
  }, [notification]);

  useEffect(() => {
    // 토큰 백엔드 서버로 등록
    const registFcmToken = async () => {
      try {
        const token = await requestForToken();
        console.log('fcm token:', token);
        postFcmToken(token);
        return token;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        console.error('error:', error);
      }
    };
    registFcmToken();

    //

    //
    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.notification?.title || 'New Notification',
          body: payload.notification?.body || '',
        });
      })
      .catch((err) => console.log('failed: ', err));
  }, []);

  return <ToastContainer />;
};

export default FCMNotification;
