import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDU3tNc2FhZpwbCeH-2l07Gq_shK6AvOQs",
  authDomain: "netflix-25bdd.firebaseapp.com",
  projectId: "netflix-25bdd",
  storageBucket: "netflix-25bdd.firebasestorage.app",
  messagingSenderId: "176846410987",
  appId: "1:176846410987:web:ae6fe4b230861a15a8daae",
  measurementId: "G-21SBJ7BVFC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const logout = async () => {
  signOut(auth);
};
export { auth, db, signup, login, logout };
