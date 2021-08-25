import { firestore } from "../firebase";
import firebase from "firebase";
interface UserSchema {
  name: string;
  email: string;
  currency: "ILS";
  savingGoal: string;
  createdOn: any;
}
const { serverTimestamp } = firebase.firestore.FieldValue;
export const getUserInfo = async (uid: string) => {
  const response = await firestore.collection("users").doc(uid).get();
  const user = response.data() as UserSchema;
  return user;
};
export const setUserInfo = async (currentUser: firebase.User) => {
  const userDoc: UserSchema = {
    name: currentUser.email?.split("@")[0] || "None",
    email: currentUser.email || "example@google.com",
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
