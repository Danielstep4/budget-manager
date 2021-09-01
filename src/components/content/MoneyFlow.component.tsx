import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { getCurrentMonth, getCurrentYear } from "../../utils/getDates";
import FlowContainer from "./FlowContainer.component";
import { FlowDocument, getMonthlyFlow } from "../../utils/db/flow";
import { useAuth } from "../../context/AuthContext";
import { useFlow } from "../../context/FlowContext";

const MoneyFlow: React.FC = () => {
  const theme = useTheme();
  const { monthlyIncomesData, monthlyExpensesData, currency } = useFlow();

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
      <FlowContainer isExpense data={monthlyExpensesData} currency={currency} />
      <FlowContainer data={monthlyIncomesData} currency={currency} />
    </Box>
  );
};

export default MoneyFlow;
