import { Box, Typography } from "@material-ui/core";
import { dataExpense, dataIncome } from "../../demo-data";
import { getCurrentMonth, getCurrentYear } from "../../utils/getDates";
import FlowContainer from "./FlowContainer.component";

const MoneyFlow: React.FC = () => {
  return (
    <Box px={10} py={5} width="100%" minHeight="100vh">
      <Typography variant="h4">
        Money Flow - {getCurrentMonth()} {getCurrentYear()}
      </Typography>
      <FlowContainer isExpense data={dataExpense} />
      <FlowContainer data={dataIncome} />
    </Box>
  );
};

export default MoneyFlow;
