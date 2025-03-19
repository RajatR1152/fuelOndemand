
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBZ_JhTKjx1NpzPZbuMA8QA-r-X_KYrobE",
    authDomain: "fuelondemand-d9301.firebaseapp.com",
    projectId: "fuelondemand-d9301",
    storageBucket: "fuelondemand-d9301.firebasestorage.app",
    messagingSenderId: "80230373524",
    appId: "1:80230373524:web:a4dd20db7e8be77f633c81",
    measurementId: "G-FNH15ZE3R3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
