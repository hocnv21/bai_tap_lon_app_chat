import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyCxxoPjm5lVQD5bFeCTFBZAouRRF52eq8s",
  authDomain: "app-chat-4f588.firebaseapp.com",
  projectId: "app-chat-4f588",
  storageBucket: "app-chat-4f588.appspot.com",
  messagingSenderId: "160042775020",
  appId: "1:160042775020:web:60fb407defaa2df62bd0c9",
};

// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
