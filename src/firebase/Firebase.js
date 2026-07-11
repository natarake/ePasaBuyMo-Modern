// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || 'AIzaSyDypM4lmNlYf7HbQTKkhcqbE4mL9-XPzWA',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'epasabuymo.firebaseapp.com',
  projectId: process.env.REACT_APP_PROJECT_ID || 'epasabuymo',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'epasabuymo.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID || '727212173707',
  appId: process.env.REACT_APP_APP_ID || '1:727212173707:web:695c7b4d9cd68884b8678e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
