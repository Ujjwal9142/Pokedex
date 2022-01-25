import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpac4ZdO2zYc-vee699tVlsfz73pSxofQ",
  authDomain: "pokedex-8d526.firebaseapp.com",
  projectId: "pokedex-8d526",
  storageBucket: "pokedex-8d526.appspot.com",
  messagingSenderId: "261667200588",
  appId: "1:261667200588:web:572fb33c6d899dde639ee9",
  measurementId: "G-QWYSJC9WP8",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
