import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAspO46yd-NVpuIDMU8qB391_vIjqkmKjU",
    authDomain: "crown-db-7f6bf.firebaseapp.com",
    databaseURL: "https://crown-db-7f6bf.firebaseio.com",
    projectId: "crown-db-7f6bf",
    storageBucket: "crown-db-7f6bf.appspot.com",
    messagingSenderId: "657737202092",
    appId: "1:657737202092:web:b2a85842a2252bdc43a209",
    measurementId: "G-CXQ5W4464F"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log("Error creating user", error.message);
      }
    }    
    
    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;