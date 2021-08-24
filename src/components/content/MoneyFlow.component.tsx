import { Box, Typography } from "@material-ui/core";
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
          <Typography variant="h6">There are {3} total expenses</Typography>
          <Button>Add Expense</Button>
        </Box>
        <Box mt={2}>
          <InfoBar
            id="3"
            isExpense
            catagory="Rent"
            date="05 Aug 2021"
            amount={3100}
            currency="ILS"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MoneyFlow;
