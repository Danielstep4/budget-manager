import { firestore } from "../../firebase";
import firebase from "firebase";

const { serverTimestamp } = firebase.firestore.FieldValue;

export const getUserInfo = async (uid: string) => {
  const response = await firestore.collection("users").doc(uid).get();
  const data = response.data() as UserDocument | undefined;
  if (!data) return;
  return {
    Currency: data.Currency,
    "Saving Goal": data["Saving Goal"],
    createdOn: data.createdOn,
  };
};

export const setUserInfo = async (currentUser: firebase.User) => {
  const userDoc: UserSchema = {
    Currency: "ILS",
    "Saving Goal": "25",
    createdOn: serverTimestamp(),
  };
  try {
    await firestore.collection("users").doc(currentUser.uid).set(userDoc);
  } catch (e) {
    console.log(e);
  }
};

export const updateUserSettings = async (
  uid: string,
  query: string,
  newVal: string
) => {
  const fieldToUpdate: any = {};
  fieldToUpdate[query] = newVal;
  try {
    firestore.collection("users").doc(uid).update(fieldToUpdate);
  } catch (e) {
    console.log(e);
  }
};

interface UserSchema {
  Currency: "ILS";
  "Saving Goal": string;
  createdOn: any;
  expenses?: string[];
  incomes?: string[];
}

export interface UserDocument extends UserSchema {}
