import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAwRjR9B7CBitB_d063e4SFIhMKntV3wBU",
  authDomain: "login-system2022.firebaseapp.com",
  projectId: "login-system2022",
  storageBucket: "login-system2022.appspot.com",
  messagingSenderId: "112238064604",
  appId: "1:112238064604:web:02a572c18a423d06d99519"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

export {auth, provider, db}