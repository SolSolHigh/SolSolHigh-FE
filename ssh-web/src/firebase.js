import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDBZkY-La3OUCPyAaNZ_g3pHix8SSAuDRA',
  authDomain: 'solsolhigh.firebaseapp.com',
  projectId: 'solsolhigh',
  storageBucket: 'solsolhigh.appspot.com',
  messagingSenderId: '75920605236',
  appId: '1:75920605236:web:f0629ade9cd01b1ceaca61',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export { messaging, analytics };

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey:
          'BDJk7HGqH8Z1qegjymTCaE4muy3OdG-tXYnZz5o2imS09412Xx8_YRV3TakKmsBC3eBYanW7kRxiVrRAnHEHt5I',
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.error('Permission not granted for notifications');
    }
  } catch (error) {
    console.error('Error getting FCM token', error);
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
