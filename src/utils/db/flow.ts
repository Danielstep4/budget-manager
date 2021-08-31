import { firestore } from "../../firebase";
import { getCurrentMonth, getCurrentYear, getMonth } from "../getDates";
import { updateUserCategories, UserDocument } from "./user";

export const addFlow = async (
  flow: FlowSchema,
  uid: string,
  isExpense?: boolean
) => {
  const cachedFlow = localStorage.getItem("flow");
  if (cachedFlow) {
    const localStorageFlow = JSON.parse(cachedFlow);
    localStorageFlow[isExpense ? "expenses" : "incomes"].push();
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
  } catch (e) {
    console.log(e);
  }
};

export const getFlow = async (uid: string, forceUpdate = false) => {
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
// In this branch its demo data, will fix it in caching branch.
export const getTotalFlow = async (uid: string) => {
  const flow = await getFlow(uid);
  if (flow) {
    const { expenses, incomes } = flow;
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncomes = incomes.reduce((acc, curr) => acc + curr.amount, 0);

    return [
      {
        name: "Expenses",
        value: totalExpenses,
      },
      { name: "Incomes", value: totalIncomes },
    ];
  }

  return [
    {
      name: "Expenses",
      value: 3200,
    },
    {
      name: "Incomes",
      value: 10000,
    },
  ];
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
