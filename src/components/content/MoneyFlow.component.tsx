import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { getCurrentMonth, getCurrentYear } from "../../utils/getDates";
import FlowContainer from "./FlowContainer.component";
import { FlowDocument, getFlow } from "../../utils/db/flow";
import { useAuth } from "../../context/AuthContext";
import { useBackdrop } from "../../context/BackdropContext";

const MoneyFlow: React.FC = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const [expenses, setExpenses] = useState<FlowDocument[] | undefined>(
    undefined
  );
  const [incomes, setIncomes] = useState<FlowDocument[] | undefined>(undefined);
  const [currency, setCurrency] = useState("ILS");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!isUpdated) {
      const cachedFlow = localStorage.getItem("flow");
      if (!cachedFlow) handleGetFlow();
      else {
        const { expenses, incomes, currency } = JSON.parse(cachedFlow) as {
          incomes: FlowDocument[];
          expenses: FlowDocument[];
          currency: string;
        };
        setExpenses(expenses);
        setIncomes(incomes);
        setCurrency((c) => currency || c);
      }
    } else {
      handleGetFlow();
      setIsUpdated(false);
    }
  }, [currentUser, isUpdated]);

  const handleGetFlow = () => {
    getFlow(currentUser!.uid)
      .then((result) => {
        if (result) {
          setExpenses(result.expenses);
          setIncomes(result.incomes);
          setCurrency((c) => result.currency || c);
          localStorage.setItem("flow", JSON.stringify(result));
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <Box
      pl={theme.sizes.menuWidth + 30 + "px"}
      py={5}
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Typography variant="h4">
        Money Flow - {getCurrentMonth()} {getCurrentYear()}
      </Typography>
      <FlowContainer
        isExpense
        data={expenses}
        currency={currency}
        setIsUpdated={setIsUpdated}
      />
      <FlowContainer
        data={incomes}
        currency={currency}
        setIsUpdated={setIsUpdated}
      />
    </Box>
  );
};

export default MoneyFlow;
