import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPMLyTuY3IWMQsS6N03ParBEhzpxeR6qQ",
  authDomain: "sanjeevani-maternal-health.firebaseapp.com",
  projectId: "sanjeevani-maternal-health",
  storageBucket: "sanjeevani-maternal-health.firebasestorage.app",
  messagingSenderId: "233418061381",
  appId: "1:233418061381:web:7ff2b99ab970847f34552c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
