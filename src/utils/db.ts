import { firestore } from "../firebase";
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

export const addFlow = async (
  flow: FlowSchema,
  uid: string,
  isExpense?: boolean
) => {
  const flowToString = JSON.stringify({
    ...flow,
    date: flow.date || serverTimestamp(),
  });
  try {
    if (isExpense) {
      await firestore
        .collection("users")
        .doc(uid)
        .update({
          expenses: firebase.firestore.FieldValue.arrayUnion(flowToString),
        });
    } else {
      await firestore
        .collection("users")
        .doc(uid)
        .update({
          incomes: firebase.firestore.FieldValue.arrayUnion(flowToString),
        });
    }
  } catch (e) {
    console.log(e);
  }
};
export const getFlow = async (uid: string) => {
  try {
    const response = await firestore.collection("users").doc(uid).get();
    const data = response.data() as UserDocument;
    if (!data) return;
    return {
      expenses: data.expenses,
      incomes: data.incomes,
      currency: data.Currency,
    };
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
interface FlowSchema {
  title: string;
  date: any;
  category: string;
  amount: number;
}
export interface UserDocument extends UserSchema {}
export interface FlowDocument extends FlowSchema {
  id: string;
}
