import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// const curry =
//   (f) =>
//   (a, ...bs) =>
//     bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);

export default initializeApp(firebaseConfig);

export const auth = getAuth();

export const createUser = async (auth, email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const signIn = async (auth, email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const authState = (auth, callback) =>
  onAuthStateChanged(auth, (user) => callback(user));

export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();

export const popUp = async (auth, provider) =>
  await signInWithPopup(auth, provider);
