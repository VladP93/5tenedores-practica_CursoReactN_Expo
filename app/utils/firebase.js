import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB5WA0c9aj-DMbUgOutVx4-22iymUlyK40",
  authDomain: "tenedores-441ae.firebaseapp.com",
  databaseURL: "https://tenedores-441ae.firebaseio.com",
  projectId: "tenedores-441ae",
  storageBucket: "tenedores-441ae.appspot.com",
  messagingSenderId: "509684087355",
  appId: "1:509684087355:web:1603a5c2f2ee790c213a1e",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
