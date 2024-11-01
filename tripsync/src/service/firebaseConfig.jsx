// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDEA9nEPVJYQRcOlip78xshvNcfwLIpdM",
    authDomain: "tripsync---ai-trip-planner.firebaseapp.com",
    projectId: "tripsync---ai-trip-planner",
    storageBucket: "tripsync---ai-trip-planner.appspot.com",
    messagingSenderId: "476581915477",
    appId: "1:476581915477:web:fb099a88a24943ff169ddc",
    measurementId: "G-R4PKM4P718"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);