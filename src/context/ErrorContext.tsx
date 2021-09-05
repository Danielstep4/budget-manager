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
  const [formValidation, setFormValidation] = useState<FormValidation>({
    error: false,
    fields: {},
  });
  const [error, setError] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  // Functions
  const createSnackError = (message: string) => {
    setError(message);
    setOpenSnack(true);
  };
  const handleCloseSnack = () => setOpenSnack(false);
  const handleFormValidation = (field: Field) =>
    setFormValidation((prev) => ({
      error: true,
      fields: {
        ...prev.fields,
        ...field,
      },
    }));
  const removeField = (key: string) => {
    setFormValidation((prev) => {
      Reflect.deleteProperty(prev.fields, key);
      if (!Object.keys(prev.fields).length) prev.error = false;
      return prev;
    });
  };
  // Value
  const value: ErrorContextValue = {
    createSnackError,
    handleFormValidation,
    removeField,
    formValidation,
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
  handleFormValidation: (field: Field) => void;
  removeField: (key: string) => void;
  formValidation: FormValidation;
}
interface FormValidation {
  error: boolean;
  fields: Field;
}
/** The Key is the input ID! */
export interface Field {
  [key: string]: {
    message: string;
  };
}
