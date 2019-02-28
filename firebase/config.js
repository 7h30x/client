import firebase from 'firebase'
// import 'firebase/firebase-firestore'
var config = {
  apiKey: "AIzaSyCinSpPwC54v_mWdk-AJ2b9ZP_YwnxahiQ",
  authDomain: "timol-4a35f.firebaseapp.com",
  databaseURL: "https://timol-4a35f.firebaseio.com",
  projectId: "timol-4a35f",
  storageBucket: "timol-4a35f.appspot.com",
  messagingSenderId: "594263780842"
};

const db = firebase.initializeApp(config);

// db = firebase.firestore()

export default db