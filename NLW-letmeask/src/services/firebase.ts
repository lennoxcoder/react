
// INTEGRAÇÃO COM O FIREBASE

import firebase from 'firebase/app';

// Sevicos utilizados
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyBLnBeIR6N6Aumxp2v5DR2NbKWiMGocMmk",
  authDomain: "letmeask-b38b1.firebaseapp.com",
  databaseURL: "https://letmeask-b38b1-default-rtdb.firebaseio.com",
  projectId: "letmeask-b38b1",
  storageBucket: "letmeask-b38b1.appspot.com",
  messagingSenderId: "172497116901",
  appId: "1:172497116901:web:58419cefd960c1e194fe0c"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();


export {firebase, auth, database}



  // Propriedades (displayName por exemnplo) e metodos: 
  // https://firebase.google.com/docs/reference/js/firebase.User