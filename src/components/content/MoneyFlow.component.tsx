import { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { getCurrentMonth, getCurrentYear } from "../../utils/getDates";
import FlowContainer from "./FlowContainer.component";
import { FlowDocument, getFlow } from "../../utils/db";
import { useAuth } from "../../context/AuthContext";
import { useBackdrop } from "../../context/BackdropContext";

const MoneyFlow: React.FC = () => {
  const { currentUser } = useAuth();
  const { backdropOpen } = useBackdrop();
  const [expenses, setExpenses] = useState<string[] | undefined>(undefined);
  const [incomes, setIncomes] = useState<string[] | undefined>(undefined);
  const [currency, setCurrency] = useState<string>("ILS");
  useEffect(() => {
    if (backdropOpen) return;
    getFlow(currentUser!.uid)
      .then((result) => {
        if (result) {
          setExpenses(result.expenses);
          setIncomes(result.incomes);
          setCurrency((c) => result.currency || c);
        }
      })
      .catch((e) => console.log(e));
  }, [currentUser, backdropOpen]);
  return (
    <Box px={10} py={5} width="100%" minHeight="100vh">
      <Typography variant="h4">
        Money Flow - {getCurrentMonth()} {getCurrentYear()}
      </Typography>
      <FlowContainer
        isExpense
        data={
          expenses && (expenses.map((str) => JSON.parse(str)) as FlowDocument[])
        }
        currency={currency}
      />
      <FlowContainer
        data={
          incomes && (incomes.map((str) => JSON.parse(str)) as FlowDocument[])
        }
        currency={currency}
      />
    </Box>
  );
};

export default MoneyFlow;
