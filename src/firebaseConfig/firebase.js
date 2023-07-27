// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJe_DPeFIWW9srqbfKDFYqtQ-11vQrXrk",
    authDomain: "crudreactfirebase-d0e4d.firebaseapp.com",
    projectId: "crudreactfirebase-d0e4d",
    storageBucket: "crudreactfirebase-d0e4d.appspot.com",
    messagingSenderId: "245485444196",
    appId: "1:245485444196:web:f37d49dd4c8c6e268f1371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);