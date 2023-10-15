// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATc-O1Sdi0hcP7CO2SX0G_M-S6gFwx0Cw",
  authDomain: "solar-spot-402016.firebaseapp.com",
  projectId: "solar-spot-402016",
  storageBucket: "solar-spot-402016.appspot.com",
  messagingSenderId: "371654267912",
  appId: "1:371654267912:web:2e24976cc51489cf3cadbd"
};

// Initialize Firebase

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const  signUpDataRef = collection(FIREBASE_DB, 'signUpData');

export default FIREBASE_APP;
