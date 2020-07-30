//imports
import firebase from 'firebase/app'
import 'firebase/firestore';

//enables us to .env variables
require('dotenv').config();

//all the variables stored in envVars 
var envVars = process.env;


// Your web app's Firebase configuration
//*You have get all the info from your own firestore database (in case you want to clone this repo)*
var firebaseConfig =  {
    apiKey: envVars.VUE_APP_API_KEY,
    authDomain: envVars.VUE_APP_AUTH_DOMAIN,
    databaseURL: envVars.VUE_APP_DATABASE_URL,
    projectId: envVars.VUE_APP_PROJECT_ID,
    storageBucket: envVars.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: envVars.VUE_APP_MESSAGING_SENDER_ID,
    appId: envVars.VUE_APP_APP_ID
  }; 

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();