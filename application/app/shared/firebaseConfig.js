import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyBZ_JhTKjx1NpzPZbuMA8QA-r-X_KYrobE",
    authDomain: "fuelondemand-d9301.firebaseapp.com",
    projectId: "fuelondemand-d9301",
    storageBucket: "fuelondemand-d9301.firebasestorage.app",
    messagingSenderId: "80230373524",
    appId: "1:80230373524:web:a4dd20db7e8be77f633c81",
    measurementId: "G-FNH15ZE3R3"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
