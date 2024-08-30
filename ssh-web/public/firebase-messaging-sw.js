/* eslint-env serviceworker */

if (typeof importScripts === 'undefined') {
  // Use dynamic imports if importScripts is not available (e.g., Vite with type: module)
  (async () => {
    const { initializeApp } = await import(
      'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
    );
    const { getMessaging, onBackgroundMessage } = await import(
      'https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js'
    );

    // Firebase 초기화
    const app = initializeApp({
      apiKey: 'AIzaSyDBZkY-La3OUCPyAaNZ_g3pHix8SSAuDRA',
      authDomain: 'solsolhigh.firebaseapp.com',
      projectId: 'solsolhigh',
      storageBucket: 'solsolhigh.appspot.com',
      messagingSenderId: '75920605236',
      appId: '1:75920605236:web:f0629ade9cd01b1ceaca61',
    });

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, (payload) => {
      console.log(
        '[firebase-messaging-sw.js] Received background message',
        payload,
      );
      const notificationTitle =
        payload.notification?.title || 'Background Message Title';
      const notificationOptions = {
        body: payload.notification?.body || 'Background Message body',
        icon: '/firebase-logo.png',
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );
    });
  })();
}
