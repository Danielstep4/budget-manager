import { firestore } from "../../firebase";
import {
  getCurrentMonth,
  getCurrentYear,
  getMonth,
  getYear,
} from "../getDates";
import { updateUserCategories, UserDocument } from "./user";

export const updateFlow = async (
  flow: FlowSchema,
  uid: string,
  fid: string,
  isExpense?: boolean
) => {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection(isExpense ? "expenses" : "incomes")
      .doc(getMonth(flow.date))
      .collection(getYear(flow.date).toString())
      .doc(fid)
      .update(flow);
    return Promise.resolve(fid + " Updated Succefully.");
  } catch {
    return Promise.reject("Error! Please try again.");
  }
};

export const removeFlow = async (
  flow: FlowSchema,
  uid: string,
  fid: string,
  isExpense?: boolean
) => {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection(isExpense ? "expenses" : "incomes")
      .doc(getMonth(flow.date))
      .collection(getYear(flow.date).toString())
      .doc(fid)
      .delete();
    return Promise.resolve(fid + " Deleted Succefully.");
  } catch {
    return Promise.reject("Error! Please try again.");
  }
};
export const addFlow = async (
  flow: FlowSchema,
  uid: string,
  isExpense?: boolean
) => {
  const cachedFlow = localStorage.getItem("flow");
  if (cachedFlow) {
    const localStorageFlow = JSON.parse(cachedFlow);
    localStorageFlow[isExpense ? "expenses" : "incomes"].push(flow);
  }
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
    return Promise.resolve();
  } catch (e) {
    console.log(e);
  }
};

export const getMonthlyFlow = async (uid: string, forceUpdate = false) => {
  if (!forceUpdate) {
    const cachedFlow = localStorage.getItem("flow");
    if (cachedFlow) {
      return JSON.parse(cachedFlow) as {
        expenses: FlowDocument[];
        incomes: FlowDocument[];
        currency: string;
      };
    }
  }
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
    localStorage.setItem(
      "flow",
      JSON.stringify({ expenses, incomes, currency: data.currency })
    );
    return {
      expenses,
      incomes,
      currency: data.currency,
    };
  } catch (e) {
    console.log(e);
  }
};

export const getTotalMonthlyFlow = async (uid: string) => {
  const flow = await getMonthlyFlow(uid);
  if (flow) {
    const { expenses, incomes } = flow;
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncomes = incomes.reduce((acc, curr) => acc + curr.amount, 0);

    return {
      totalExpenses,
      totalIncomes,
    };
  }
};

export const clearFlowLocalStorage = () => {
  localStorage.removeItem("flow");
};
export interface FlowSchema {
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
