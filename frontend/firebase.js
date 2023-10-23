// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqkc0D5EkBgDBfoNF_Iy_q0tZeDEnzCko",
    authDomain: "it20265892.firebaseapp.com",
    projectId: "it20265892",
    storageBucket: "it20265892.appspot.com",
    messagingSenderId: "419412241817",
    appId: "1:419412241817:web:c95f05845a84586fe53708"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth, firebase };