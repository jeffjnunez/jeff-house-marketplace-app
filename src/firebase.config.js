import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDSOudPjsRbYH6isDgPkyJJvjjdlXe4e-I',
  authDomain: 'jeff-house-marketplace-app.firebaseapp.com',
  projectId: 'jeff-house-marketplace-app',
  storageBucket: 'jeff-house-marketplace-app.appspot.com',
  messagingSenderId: '1048325905437',
  appId: '1:1048325905437:web:50e6d53536f9a7b92a7af4'
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();