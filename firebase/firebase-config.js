// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuOCT3WdrKRKE8B710u1lv1sTwc5ydA94",
  authDomain: "testmakerai-71de1.firebaseapp.com",
  projectId: "testmakerai-71de1",
  storageBucket: "testmakerai-71de1.firebasestorage.app",
  messagingSenderId: "874861513664",
  appId: "1:874861513664:web:8ae41fb2bfae17de6a9625",
  measurementId: "G-27ESXK70YB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
