// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIQNOqX_WsNUyHted8c31a3Dc7VsEhiJQ",
  authDomain: "eco-saathi.firebaseapp.com",
  databaseURL: "https://eco-saathi-default-rtdb.firebaseio.com",
  projectId: "eco-saathi",
  storageBucket: "eco-saathi.appspot.com",
  messagingSenderId: "660356380091",
  appId: "1:660356380091:web:cdf121a36fbe3964b1809e"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const  signUpData = collection(FIREBASE_DB, 'signUpData');

export default FIREBASE_APP;