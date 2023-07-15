// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Pf2ehvcQIjRNVxwYdZKXWpYpa2IA-Ao",
  authDomain: "first-react-pro-db650.firebaseapp.com",
  projectId: "first-react-pro-db650",
  storageBucket: "first-react-pro-db650.appspot.com",
  messagingSenderId: "203276097777",
  appId: "1:203276097777:web:4a70a1bd42d09f2be83150",
  measurementId: "G-F08Z018E4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);