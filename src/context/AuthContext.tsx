import React, { useState, useContext } from "react";
import { createContext } from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import { useEffect } from "react";
export interface AuthContextValue {
  currentUser: firebase.User | null;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
}
const AuthContext = createContext<AuthContextValue | {}>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const login = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signup = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));
    return unsubscribe;
  }, []);
  const value: AuthContextValue = {
    currentUser,
    signup,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
