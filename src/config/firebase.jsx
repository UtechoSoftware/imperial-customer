// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxfTzOOY8g5Nlws6GZSekIvuD2xr9Rsb4",
  authDomain: "q-med-2db10.firebaseapp.com",
  projectId: "q-med-2db10",
  storageBucket: "q-med-2db10.appspot.com",
  messagingSenderId: "591799461224",
  appId: "1:591799461224:web:8f223e9b2a14b46cd322dd",
  measurementId: "G-21WDDBPGP8"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };