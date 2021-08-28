import { firestore } from "../firebase";
import firebase from "firebase";
import { getCurrentMonth, getCurrentYear, getMonth } from "./getDates";
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
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection(isExpense ? "expenses" : "incomes")
      .doc(getMonth(flow.date))
      .collection(getCurrentYear())
      .add(flow);
  } catch (e) {
    console.log(e);
  }
};
export const getFlow = async (uid: string) => {
  try {
    const expenses: FlowDocument[] = [];
    const incomes: FlowDocument[] = [];
    (
      await firestore
        .collection("users")
        .doc(uid)
        .collection("expenses")
        .doc(getCurrentMonth())
        .collection(getCurrentYear())
        .get()
    ).forEach((item) => {
      const data = item.data() as FlowSchema;
      expenses.push({
        ...data,
        id: item.id,
      });
    });
    (
      await firestore
        .collection("users")
        .doc(uid)
        .collection("incomes")
        .doc(getCurrentMonth())
        .collection(getCurrentYear())
        .get()
    ).forEach((item) => {
      const data = item.data() as FlowSchema;
      incomes.push({
        ...data,
        id: item.id,
      });
    });
    const response = await firestore.collection("users").doc(uid).get();
    const data = response.data() as UserDocument;
    if (!data) return;
    return {
      expenses,
      incomes,
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
  date: Date | number;
  category: string;
  amount: number;
}
export interface UserDocument extends UserSchema {}
export interface FlowDocument extends FlowSchema {
  id: string;
}
