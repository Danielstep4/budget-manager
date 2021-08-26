import React, { useState, useContext } from "react";
import { createContext } from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import { useEffect } from "react";
import { setUserInfo } from "../utils/db";

const AuthContext = createContext<AuthContextValue | {}>({});

export const useAuth = (): AuthContextValue => {
  ///@ts-expect-error
  return useContext(AuthContext);
};
const AuthProvider: React.FC = ({ children }) => {
  // State
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [hasAccount, setHasAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  // useEffects
  useEffect(() => {
    const hasAccountLocalStorage = localStorage.getItem("hasAccount");
    if (!hasAccountLocalStorage) return;
    setHasAccount(!!hasAccountLocalStorage);
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // Helper Functions
  const login = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signup = async (email: string, password: string) => {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    const { user } = response;
    if (user) {
      await setUserInfo(user);
    }
    return response;
  };
  const signOut = () => auth.signOut();
  const getUserPersonalInfo = () => {
    if (!currentUser) return;
    return {
      name: currentUser.displayName,
      email: currentUser.email,
    };
  };
  // Value
  const value: AuthContextValue = {
    currentUser,
    signup,
    login,
    hasAccount,
    signOut,
    getUserPersonalInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export interface AuthContextValue {
  currentUser: firebase.User | null;
  hasAccount: boolean;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
  getUserPersonalInfo: () => UserPersonalInfo | undefined;
}

export interface UserPersonalInfo {
  name: string | null;
  email: string | null;
}
