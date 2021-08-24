import { Box, Typography } from "@material-ui/core";
import { dataExpense, dataIncome } from "../../demo-data";
import { getCurrentMonth, getCurrentYear } from "../../utils/getDates";
import Button from "../global/Button.component";
import InfoBar from "./InfoBar";

const MoneyFlow: React.FC = () => {
  return (
    <Box px={10} py={5} width="100%" height="100%">
      <Typography variant="h4">
        Money Flow - {getCurrentMonth()} {getCurrentYear()}
      </Typography>
      <Box width="50%" mt={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            There are {dataExpense.length} total expenses
          </Typography>
          <Button>Add Expense</Button>
        </Box>
        <Box mt={2}>
          {dataExpense.map((obj) => (
            <InfoBar {...obj} key={obj.id} />
          ))}
        </Box>
      </Box>
      <Box width="50%" mt={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            There are {dataIncome.length} total incomes
          </Typography>
          <Button>Add Income</Button>
        </Box>
        <Box mt={2}>
          {dataIncome.map((obj) => (
            <InfoBar {...obj} key={obj.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MoneyFlow;
