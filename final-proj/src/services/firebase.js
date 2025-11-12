// this is like the mastr key to get firebase to work
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // connects to firebase cloud service
import { getAuth } from "firebase/auth"; // connects to firebase authentication service

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALI00Tx4zcj7yyjPm8tUC_5MCucLzmJBw",
  authDomain: "final-project-hcde-438-2f1f6.firebaseapp.com",
  projectId: "final-project-hcde-438-2f1f6",
  storageBucket: "final-project-hcde-438-2f1f6.firebasestorage.app",
  messagingSenderId: "684004234345",
  appId: "1:684004234345:web:e2168bd472eaaaaf54bef8",
  measurementId: "G-HQ552GWJNZ"
};

// Initialize Firebase 
// we expoert them so they are accesible elsewhere in the project
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };