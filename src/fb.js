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
  where,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket:
    process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// const curry = (f) =>
//   f.length
//     ? function (...a) {
//         return curry(f.bind(f, ...a));
//       }
//     : f();

const curry =
  (f) =>
  (a, ...bs) =>
    bs.length
      ? f(a, ...bs)
      : (...bs) => f(a, ...bs);

const firebaseApp = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth(firebaseApp);

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

export const authState = (auth, callback) =>
  onAuthStateChanged(auth, (user) =>
    callback(user),
  );

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();

export const popUp = async (auth, provider) =>
  await signInWithPopup(auth, provider);

//DB
const db = getFirestore();

const queryCurry = (t, ...arg) =>
  curry(query(t, ...arg));

const docRefCurry = curry(
  async (db, docu, object) =>
    await addDoc(collection(db, docu), object),
);

const querySnapShotCurry = curry(
  async (db, docu) =>
    await getDocs(collection(db, docu)),
);

const snapShotCurry = curry(
  (db, path, segm, callback) =>
    onSnapshot(doc(db, path, segm), callback),
);

export const orderByCurry = (path, order) =>
  orderBy(path, order);

export const whereCurry = (t, e, n) =>
  where(t, e, n);

const snapCurry = curry((db, path, callback) => {
  onSnapshot(
    query(collection(db, path)),
    callback,
  );
});

const snapFunctionCurry = curry(
  (db, path, callback, f) => {
    onSnapshot(
      query(collection(db, path), f),
      callback,
    );
  },
);
const deleteNweetCurry = curry(
  async (db, col, id) =>
    await deleteDoc(doc(db, col, id)),
);

const updateNweetCurry = curry(
  async (db, col, id, update) =>
    await updateDoc(doc(db, col, id), update),
);

export const docRef = docRefCurry(db);
export const querySnapShot =
  querySnapShotCurry(db);
export const snapShot = snapShotCurry(db);
export const snap = snapCurry(db);
export const snapFunction = snapFunctionCurry(db);
export const deleteNweet = deleteNweetCurry(db);
export const updateNweet = updateNweetCurry(db);
//storage
export const storage = getStorage();

export const storageRef = (storage, child) =>
  ref(storage, child);

export const uploadFile = async (
  storageRef,
  file,
) => await uploadBytes(storageRef, file);

export const downloadFile = async (storageRef) =>
  await getDownloadURL(storageRef);

export const deleteObj = async (ref) =>
  await deleteObject(ref);
