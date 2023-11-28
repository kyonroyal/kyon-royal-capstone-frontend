import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcIzDGRwzVEDZL7lyxAWsR-W_wSTHNY6c",
  authDomain: "kyon-royal-capstone.firebaseapp.com",
  projectId: "kyon-royal-capstone",
  storageBucket: "kyon-royal-capstone.appspot.com",
  messagingSenderId: "960876069966",
  appId: "1:960876069966:web:e79a31b56cc43cfb006f1f",
  measurementId: "G-2R6GQTEKX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Storage
const storage = getStorage(app);

export { auth, googleProvider, storage };
