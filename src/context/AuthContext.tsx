import React, { useState } from "react";
import { createContext } from "react";
const AuthContext = createContext({});

const value = {};

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const login = (email: string, password: string) => {};
  const signup = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
