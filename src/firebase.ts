import firebase from "firebase/app";
import { firebaseConfig } from "../firebase.config.js";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;
