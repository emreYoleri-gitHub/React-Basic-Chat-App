import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBD2ITvREANz4kxCvc2S4u646lyupYjezQ",
  authDomain: "react-chat-app-d3b48.firebaseapp.com",
  projectId: "react-chat-app-d3b48",
  storageBucket: "react-chat-app-d3b48.appspot.com",
  messagingSenderId: "194520585968",
  appId: "1:194520585968:web:5497c6ad7745a6cb45d435",
  measurementId: "G-6YBJ54WVJ4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
