import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDu-MN-oNrxzkZlHuYMW4CAfFlGqylqtdw",
    authDomain: "fir-react-b60dd.firebaseapp.com",
    projectId: "fir-react-b60dd",
    storageBucket: "fir-react-b60dd.appspot.com",
    messagingSenderId: "202923120940",
    appId: "1:202923120940:web:efcc47d0dffbe92734b489",
    measurementId: "G-LX09JV5MGS"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, provider);

export {app, auth, db, signInWithGoogle} 