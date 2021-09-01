import React, { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import {
  FlowDocument,
  getMonthlyFlow,
  getTotalMonthlyFlow,
} from "../utils/db/flow";
import { getCurrentMonth, getCurrentYear } from "../utils/getDates";
import { useAuth } from "./AuthContext";

// Currently unused
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
    initState()
      .then(() => setIsUpdated(false))
      .catch(console.log);
  }, [currentUser, isUpdated]);

  // Helper Functions
  const initState = async () => {
    if (!currentUser) return;
    try {
      const monthlyFlow = await getMonthlyFlow(currentUser.uid, isUpdated);
      if (monthlyFlow) {
        setMonthlyIncomesData(monthlyFlow.incomes);
        setMonthlyExpensesData(monthlyFlow.expenses);
        setCurrency(monthlyFlow.currency);
      }
      const totalMonthlyFlow = await getTotalMonthlyFlow(currentUser!.uid);
      if (totalMonthlyFlow) {
        setUserMonthlyTotalExpenses(totalMonthlyFlow.totalExpenses);
        setUserMonthlyTotalIncomes(totalMonthlyFlow.totalIncomes);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleFlowUpdated = () => [setIsUpdated(true)];
  // Value
  const value: FlowContextValue = {
    currency,
    monthlyExpensesData,
    monthlyIncomesData,
    userMonthlyTotalExpenses,
    userMonthlyTotalIncomes,
    handleFlowUpdated,
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
  handleFlowUpdated: () => void;
}
