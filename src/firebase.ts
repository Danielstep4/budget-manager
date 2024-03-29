import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: process.env.REACT_APP_ATUH_DOMAIN,

  databaseURL: process.env.REACT_APP_DATABASE_URL,

  projectId: process.env.REACT_APP_PROJECT_ID,

  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_APP_ID,

  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});
export const auth = app.auth();
export const firestore = app.firestore();
export default app;
