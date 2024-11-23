import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDR1RRhKG9qHUlcHqGMF1Iq_jgGBxwBPDM",
  authDomain: "ecosense-d3f99.firebaseapp.com",
  projectId: "ecosense-d3f99",
  storageBucket: "ecosense-d3f99.appspot.com",
  messagingSenderId: "846033575588",
  appId: "1:846033575588:web:9d9b9b9b9b9b9b9b9b9b9b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);