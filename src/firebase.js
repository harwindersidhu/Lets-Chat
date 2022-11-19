import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjs5mUjiakzUTj0oP-h_Jg5oYL1BbFAMg",
  authDomain: "chat-c2679.firebaseapp.com",
  projectId: "chat-c2679",
  storageBucket: "chat-c2679.appspot.com",
  messagingSenderId: "649864017492",
  appId: "1:649864017492:web:8ec7fef3f9ee0722b11fc1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();