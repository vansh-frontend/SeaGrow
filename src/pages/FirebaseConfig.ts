import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnWpDV5L5PSzmmHcH9-IVGmqG2n8gmePk",
  authDomain: "seagro-9950d.firebaseapp.com",
  projectId: "seagro-9950d",
  storageBucket: "seagro-9950d.appspot.com",
  messagingSenderId: "700836761199",
  appId: "540776989657-ch35i527mq64ptekm0vfdgg06la6j014.apps.googleusercontent.com",
  measurementId: "G-Z834VDBXBX" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
