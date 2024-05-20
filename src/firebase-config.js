import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBits6XL_ufH5RAKvTNfgavsi_9syLdsjA",
    authDomain: "hospital-management-syst-93fcd.firebaseapp.com",
    databaseURL: "https://hospital-management-syst-93fcd-default-rtdb.firebaseio.com",
    projectId: "hospital-management-syst-93fcd",
    storageBucket: "hospital-management-syst-93fcd.appspot.com",
    messagingSenderId: "293818708055",
    appId: "1:293818708055:web:22e95a33e3531e4759b312",
    measurementId: "G-7EBLXTW1B1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
