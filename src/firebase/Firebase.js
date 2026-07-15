// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || 'epasabuymo.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID || 'epasabuymo',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || 'epasabuymo.appspot.com',
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID || '727212173707',
  appId: import.meta.env.VITE_APP_ID || '1:727212173707:web:695c7b4d9cd68884b8678e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
