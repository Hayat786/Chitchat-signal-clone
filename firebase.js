import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";









const firebaseConfig = 
{
  apiKey: 'AIzaSyA_wZzcUyd6k573I5bquJY50CxFmS-wHyg',
  authDomain: 'chitchat-c94aa.firebaseapp.com',
  databaseURL: 'https://chitchat-c94aa-default-rtdb.firebaseio.com/',
  projectId: 'chitchat-c94aa',
  storageBucket: 'chitchat-c94aa.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:94256516288:android:580a58653e7578c51cb125',
  measurementId: 'G-measurement-id',
  };

  let app;
  if(firebase.apps.length === 0)
  {
    app = firebase.initializeApp(firebaseConfig);


  }
  else 
  {
app =firebase.app();

  }
  const db = app.firestore();
  const auth = firebase.auth();

  export{db,auth};

