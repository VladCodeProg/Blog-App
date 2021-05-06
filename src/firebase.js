import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fireConfig = firebase.initializeApp({
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    measurementId: "YOUR_FIREBASE_MEASUREMENT_ID"
});

const signUp = (success, failure) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    fireConfig.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            success(user);
        }).catch(err => failure(err));
    
}

const signOut = (success, failure) => {
    fireConfig.auth().signOut()
        .then(() => success())
        .catch(err => failure(err))
}

export { signUp, signOut, fireConfig }