import firebase from 'firebase/app';
import 'firebase/messaging'; // Import messaging service

// Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: 'AIzaSyDBZkY-La3OUCPyAaNZ_g3pHix8SSAuDRA',
  authDomain: 'solsolhigh.firebaseapp.com',
  projectId: 'solsolhigh',
  storageBucket: 'solsolhigh.appspot.com',
  messagingSenderId: '75920605236',
  appId: '1:75920605236:web:f0629ade9cd01b1ceaca61',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Messaging service
export const messaging = firebase.messaging();
