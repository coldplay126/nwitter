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

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_API_KEY,
  authDomain:
    process.env
      .REACT_APP_AUTH_DOMAIN,
  projectId:
    process.env
      .REACT_APP_PROJECT_ID,
  storageBucket:
    process.env
      .REACT_APP_STORAGE_BUCKET,
  messagingSenderId:
    process.env
      .REACT_APP_MESSAGEING_SENDER_ID,
  appId:
    process.env.REACT_APP_APP_ID,
};

// const curry =
//   (f) =>
//   (a, ...bs) =>
//     bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);

initializeApp(firebaseConfig);

//Auth
export const auth = getAuth();

export const createUser = async (
  auth,
  email,
  password,
) =>
  await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

export const signIn = async (
  auth,
  email,
  password,
) =>
  await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

export const authState = (
  auth,
  callback,
) =>
  onAuthStateChanged(
    auth,
    (user) => callback(user),
  );

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();

export const popUp = async (
  auth,
  provider,
) =>
  await signInWithPopup(
    auth,
    provider,
  );

//DB
export const db = getFirestore();

export const docRef = async (
  db,
  docu,
  object,
) =>
  await addDoc(
    collection(db, docu),
    object,
  );

export const querySnapShot =
  async (db, docu) =>
    await getDocs(
      collection(db, docu),
    );

export const snapShot = (
  db,
  path,
  segm,
  callback,
) =>
  onSnapshot(
    doc(db, path, segm),
    callback,
  );

//const literal = (a, b) => orderBy(a, b);

export const snap = (
  db,
  path,
  callback,
  ...arg
) => {
  arg
    ? onSnapshot(
        query(
          collection(db, path),
          orderBy(arg[0], arg[1]),
        ),
        callback,
      )
    : onSnapshot(
        query(
          collection(db, path),
        ),
        callback,
      );
};

export const deleteNweet = async (
  db,
  col,
  id,
) =>
  await deleteDoc(
    doc(db, col, id),
  );

export const updateNweet = async (
  db,
  col,
  id,
  update,
) =>
  await updateDoc(
    doc(db, col, id),
    update,
  );

// export const snap = (db, path, callback, orderby = undefined) => {
//   orderby
//     ? onSnapshot(query(collection(db, path).order()), callback)
//     : onSnapshot(query(collection(db, path)), callback);
// };
