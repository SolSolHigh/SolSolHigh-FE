// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
