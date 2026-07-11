// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDypM4lmNlYf7HbQTKkhcqbE4mL9-XPzWA",
  authDomain: "epasabuymo.firebaseapp.com",
  projectId: "epasabuymo",
  storageBucket: "epasabuymo.appspot.com",
  messagingSenderId: "727212173707",
  appId: "1:727212173707:web:695c7b4d9cd68884b8678e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
