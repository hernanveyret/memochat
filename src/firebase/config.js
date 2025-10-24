import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjlHG7BtSrEP_DfsAWJ70FNcSaUn2mAig",
  authDomain: "chat-83fb0.firebaseapp.com",
  projectId: "chat-83fb0",
  storageBucket: "chat-83fb0.firebasestorage.app",
  messagingSenderId: "496503762613",
  appId: "1:496503762613:web:5ca65f6a98f03c9dc658fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };