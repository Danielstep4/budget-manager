import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { getCurrentMonth, getCurrentYear } from "../../utils/getDates";
import FlowContainer from "./FlowContainer.component";
import { useFlow } from "../../context/FlowContext";

const MoneyFlow: React.FC = () => {
  const theme = useTheme();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMedium = useMediaQuery(theme.breakpoints.down("md"));
  const { monthlyIncomesData, monthlyExpensesData, currency } = useFlow();

  return (
    <Box
      py={5}
      width="100%"
      minHeight="100vh"
      maxWidth="1000px"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Typography variant={matchesXSmall ? "h5" : "h4"}>
        Money Flow - {getCurrentMonth()} {getCurrentYear()}
      </Typography>
      <FlowContainer isExpense data={monthlyExpensesData} currency={currency} />
      <FlowContainer data={monthlyIncomesData} currency={currency} />
    </Box>
  );
};

export default MoneyFlow;
