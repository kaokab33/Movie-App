// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7IGo1HuXzoyBx6aFTseSvMQCXUB2gQak",
    authDomain: "movieapp-f49a1.firebaseapp.com",
    projectId: "movieapp-f49a1",
    storageBucket: "movieapp-f49a1.appspot.com",
    messagingSenderId: "871615971141",
    appId: "1:871615971141:web:7b72cd32e0faa51f70082c",
    measurementId: "G-28R7W02PF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
