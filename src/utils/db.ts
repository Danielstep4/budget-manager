import { firestore } from "../firebase";
import firebase from "firebase";

const { serverTimestamp } = firebase.firestore.FieldValue;
export const getUserInfo = async (uid: string) => {
  const response = await firestore.collection("users").doc(uid).get();
  const user = response.data() as UserDocument | undefined;
  return user;
};

export const setUserInfo = async (currentUser: firebase.User) => {
  const userDoc: UserSchema = {
    currency: "ILS",
    savingGoal: "25",
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
  currency: "ILS";
  savingGoal: string;
  createdOn: any;
}
export interface UserDocument extends UserSchema {}
