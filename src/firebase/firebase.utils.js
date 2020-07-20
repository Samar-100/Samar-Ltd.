import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDi-zA0_q5KkV4Ch6FrqUpNC685FqZ6cBo",
  authDomain: "e-commerce-b334b.firebaseapp.com",
  databaseURL: "https://e-commerce-b334b.firebaseio.com",
  projectId: "e-commerce-b334b",
  storageBucket: "e-commerce-b334b.appspot.com",
  messagingSenderId: "851098176947",
  appId: "1:851098176947:web:11d7cb5ebb8c5f52530fc6",
  measurementId: "G-RBPFGPGM3R",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
