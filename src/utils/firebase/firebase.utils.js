import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
}   from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc, //access to document
    setDoc  //data setting
} 
from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA4bJ_SUhXNcn7RMqS8zjOWktomjMzeHd8",
  authDomain: "crwn-clothing-db-464ca.firebaseapp.com",
  projectId: "crwn-clothing-db-464ca",
  storageBucket: "crwn-clothing-db-464ca.appspot.com",
  messagingSenderId: "297055228727",
  appId: "1:297055228727:web:1ae8a972d57fb886f740b2"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data does not exist
    //create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) { console.log('eroor creating the user' + error.message)}
    }

    //if user data exists
    //return userDocRef
    return  userDocRef;

}