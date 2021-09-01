import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import AuthProvider from "./context/AuthContext";
import theme from "./style/theme";
import BackdropProvider from "./context/BackdropContext";
import ErrorProvider from "./context/ErrorContext";
import FlowProvider from "./context/FlowContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BackdropProvider>
          <ErrorProvider>
            <FlowProvider>
              <App />
            </FlowProvider>
          </ErrorProvider>
        </BackdropProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
