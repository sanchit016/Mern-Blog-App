import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDlIh18DMxCccZDARBqi_hciMcF8fZPPM",
  authDomain: "mern-blog-48fd0.firebaseapp.com",
  projectId: "mern-blog-48fd0",
  storageBucket: "mern-blog-48fd0.appspot.com",
  messagingSenderId: "883092925350",
  appId: "1:883092925350:web:f20c3ec5fd49b36026bd67",
  measurementId: "G-N3B0ZNS9TW"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export { auth };
