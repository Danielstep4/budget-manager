import React, { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import {
  FlowDocument,
  getMonthlyFlow,
  getTotalMonthlyFlow,
} from "../utils/db/flow";
import { getCurrentMonth, getCurrentYear } from "../utils/getDates";
import { useAuth } from "./AuthContext";

const CURRENT_DATE = {
  month: getCurrentMonth(),
  year: getCurrentYear(),
};

const FlowContext = createContext<FlowContextValue | {}>({});

export const useFlow = (): FlowContextValue => {
  /// @ts-ignore
  return useContext(FlowContext);
};

const FlowProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  // State
  const [isUpdated, setIsUpdated] = useState(false);
  const [currency, setCurrency] = useState<string>("ILS");
  const [monthlyIncomesData, setMonthlyIncomesData] = useState<
    FlowDocument[] | undefined
  >();
  const [monthlyExpensesData, setMonthlyExpensesData] = useState<
    FlowDocument[] | undefined
  >();
  const [userMonthlyTotalExpenses, setUserMonthlyTotalExpenses] = useState<
    number | undefined
  >();
  const [userMonthlyTotalIncomes, setUserMonthlyTotalIncomes] = useState<
    number | undefined
  >();
  // useEffects
  useEffect(() => {
    if (!currentUser) return;
    getTotalMonthlyFlow(currentUser!.uid)
      .then((result) => {
        if (result) {
          setUserMonthlyTotalExpenses(result.totalExpenses);
          setUserMonthlyTotalIncomes(result.totalIncomes);
        }
      })
      .catch((e) => console.log(e));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    getMonthlyFlow(currentUser.uid)
      .then((result) => {
        if (result) {
          setMonthlyIncomesData(result.incomes);
          setMonthlyExpensesData(result.expenses);
          setCurrency(result.currency);
        }
      })
      .catch((e) => console.log(e));
  }, [currentUser]);
  // Helper Functions

  // Value
  const value: FlowContextValue = {
    currency,
    monthlyExpensesData,
    monthlyIncomesData,
    userMonthlyTotalExpenses,
    userMonthlyTotalIncomes,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

export default FlowProvider;

export interface FlowContextValue {
  currency: string;
  monthlyExpensesData: FlowDocument[] | undefined;
  monthlyIncomesData: FlowDocument[] | undefined;
  userMonthlyTotalExpenses: number | undefined;
  userMonthlyTotalIncomes: number | undefined;
}
