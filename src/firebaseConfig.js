import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: `${process.env.firestore_api_key}`,
  authDomain: "siyum-mishnayos.firebaseapp.com",
  projectId: "siyum-mishnayos",
  storageBucket: "siyum-mishnayos.appspot.com",
  messagingSenderId: "867011398910",
  appId: "1:867011398910:web:651bc4223696758e5e69af"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)