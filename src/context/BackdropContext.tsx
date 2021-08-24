import { Box } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { createContext } from "react";

const BackdropContext = createContext<BackDropContextValue | {}>({});

export const useBackdrop = (): BackDropContextValue => {
  ///@ts-expect-error
  return useContext(BackdropContext);
};
const BackdropProvider: React.FC = ({ children }) => {
  // State
  const [backdropOpen, setBackdropOpen] = useState(false);
  // Value
  const value: BackDropContextValue = {
    backdropOpen,
    setBackdropOpen,
  };
  return (
    <BackdropContext.Provider value={value}>
      {children}
      <Box
        display={backdropOpen ? "block" : "none"}
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="100vw"
        height="100vh"
        bgcolor="rgba(0, 0, 0, 0.4)"
        onClick={() => setBackdropOpen(!backdropOpen)}
        zIndex="1"
      ></Box>
    </BackdropContext.Provider>
  );
};

export default BackdropProvider;

interface BackDropContextValue {
  backdropOpen: boolean;
  setBackdropOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
