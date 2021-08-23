import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./style/theme";
import firebase from "firebase/app";
import { firebaseConfig } from "../firebase.config.js";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
