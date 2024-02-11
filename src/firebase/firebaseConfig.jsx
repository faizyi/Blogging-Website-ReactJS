import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { getFirestore,setDoc,doc,getDocs,getDoc,collection, addDoc,onSnapshot,where } from "firebase/firestore";
import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAtKqS4Gqd5n1Nm1S1vla2zCdy9h8hyunY",
  authDomain: "react-routing-auth.firebaseapp.com",
  projectId: "react-routing-auth",
  storageBucket: "react-routing-auth.appspot.com",
  messagingSenderId: "293188926458",
  appId: "1:293188926458:web:89e08d2c2fe958543f0243",
  measurementId: "G-7FCC7HE8XG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    db,
    setDoc,
    doc,
    getDocs,
    getDoc,
    ref,
    uploadBytes,
    storage,
    uploadBytesResumable,
    getDownloadURL,
    collection,
    addDoc,
    onSnapshot,
    where,
}