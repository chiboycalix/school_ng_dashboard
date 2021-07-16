
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { functions } from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBJqG4ROG2FsQlXAWvbtgOibo5PxAqGDUQ",
  authDomain: "my-project-7307f.firebaseapp.com",
  databaseURL: "https://my-project-7307f.firebaseio.com",
  projectId: "my-project-7307f",
  storageBucket: "my-project-7307f.appspot.com",
  messagingSenderId: "712367246617",
  appId: "1:712367246617:web:02e1571f7b95835f608988"
};

// var firebaseConfig = {
//   apiKey: "AIzaSyDgNeshaL_tg2dWtVZn-8JencX__-WbW5k",
//   authDomain: "schooln-test.firebaseapp.com",
//   databaseURL: "https://schooln-test-default-rtdb.firebaseio.com",
//   projectId: "schooln-test",
//   storageBucket: "schooln-test.appspot.com",
//   messagingSenderId: "150554653912",
//   appId: "1:150554653912:web:0d88bc9919c1d94c2a53ad"
// };

// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);

export var storage = firebase.storage();

const messaging = firebase.messaging();

export const tokens = []

Notification.requestPermission()
  .then(permission => {
    if (permission === "granted") {
      messaging.getToken().then(token => {
        tokens.push(token)
      })
    } else {
      console.log("permission denied")
    }
  })
  .catch((err) => console.log(err))


messaging.onMessage(payload => {
  console.log("on message", payload)
})

export default fire;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const secondAuth = firebase.initializeApp(firebaseConfig, "Secondary");
// export const functions = firebase.functions()


const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
