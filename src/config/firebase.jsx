import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider } from "firebase/auth";
// import { GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk3atP6IQLAyXRfivzgwgPqOJRsM195yU",
  authDomain: "resume-f3147.firebaseapp.com",
  projectId: "resume-f3147",
  storageBucket: "resume-f3147.appspot.com",
  messagingSenderId: "37411595091",
  appId: "1:37411595091:web:e035bac281a3c1bdf0b7a6",
  measurementId: "G-SXBGPSVDJR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export { auth, app, db };
