import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfGI2IBgVgDnk9rUAz-9kr7c9fftrWHkw",
  authDomain: "chat-app-6da6b.firebaseapp.com",
  projectId: "chat-app-6da6b",
  storageBucket: "chat-app-6da6b.appspot.com",
  messagingSenderId: "362245306665",
  appId: "1:362245306665:web:82102bdf2e58b4703c9f38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();