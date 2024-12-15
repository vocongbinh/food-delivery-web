
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyC0XXkaB0UYmBYt1QqBakPiJQFxOp7Vr-A",
    authDomain: "food-delivery-5d18e.firebaseapp.com",
    projectId: "food-delivery-5d18e",
    storageBucket: "food-delivery-5d18e.firebasestorage.app",
    messagingSenderId: "975980210647",
    appId: "1:975980210647:web:d658db918b28775b730392",
    measurementId: "G-M2PL0GH47B"
};


let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const messaging = getMessaging(firebase_app);
getToken(messaging, {vapidKey: "BHDlDw_3heSyrsVD95b-lCMfDiHkJi8GJn8LxyyhTymWdULLuxoGxpGxUiPCT8c3sAhy22ffbFQJk-mQwlPNmJI"});
export default firebase_app;