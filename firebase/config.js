import firebase from 'firebase'
import 'firebase/firebase-firestore'
var config = {
  apiKey: "AIzaSyBE1W2cxpz4e2plSa43soci_nRQdZK591I",
  authDomain: "final-project-9df54.firebaseapp.com",
  databaseURL: "https://final-project-9df54.firebaseio.com",
  projectId: "final-project-9df54",
  storageBucket: "",
  messagingSenderId: "329092042620"
};
firebase.initializeApp(config);

db = firebase.firestore()

export default db