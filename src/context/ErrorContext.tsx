import React, { useState, useContext } from "react";
import { createContext } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
const ErrorContext = createContext<ErrorContextValue | {}>({});

export const useError = (): ErrorContextValue => {
  ///@ts-expect-error
  return useContext(ErrorContext);
};

const ErrorProvider: React.FC = ({ children }) => {
  // State
  const [error, setError] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  // Functions
  const createSnackError = (message: string) => {
    setError(message);
    setOpenSnack(true);
  };
  const handleCloseSnack = () => setOpenSnack(false);
  // Value
  const value: ErrorContextValue = {
    createSnackError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;

interface ErrorContextValue {
  createSnackError: (message: string) => void;
}
