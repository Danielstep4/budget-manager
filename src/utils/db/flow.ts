import { firestore } from "../../firebase";
import { getCurrentMonth, getCurrentYear, getMonth } from "../getDates";
import { updateUserCategories, UserDocument } from "./user";

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
      .add({
        ...flow,
      });
    await updateUserCategories(uid, flow.category);
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
      const data = item.data() as FlowDocument;
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
      const data = item.data() as FlowDocument;
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
      currency: data.currency,
    };
  } catch (e) {
    console.log(e);
  }
};

interface FlowSchema {
  title: string;
  date: Date;
  category: string;
  amount: number;
}

export interface FlowDocument extends Omit<FlowSchema, "date"> {
  id: string;
  date: {
    seconds: number;
  };
}
