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

  const signup = async (email: string, password: string, fullname: string) => {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    const { user } = response;
    if (user) {
      await setUserInfo(user);
      await user.updateProfile({ displayName: fullname });
    }
    return response;
  };
  const signOut = async () => {
    await auth.signOut();
    window.location.reload();
  };

  const updateUserPersonalInfo = async (query: string, newVal: string) => {
    if (!currentUser) return;
    try {
      if (query === "email") {
        await currentUser.updateEmail(newVal);
      } else {
        const fieldToUpdate: any = {};
        fieldToUpdate[query] = newVal;
        await currentUser.updateProfile(fieldToUpdate);
        await auth.updateCurrentUser(currentUser);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getUserPersonalInfo = (): UserPersonalInfo | undefined => {
    if (!currentUser) return;
    return {
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
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
    updateUserPersonalInfo,
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
    password: string,
    fullname: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
  getUserPersonalInfo: () => UserPersonalInfo | undefined;
  updateUserPersonalInfo: (query: string, newVal: string) => Promise<void>;
}

export interface UserPersonalInfo {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
