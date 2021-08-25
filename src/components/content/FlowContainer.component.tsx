import { DemoDataExpense, DemoDataIncome } from "../../demo-data";
import InfoBar from "./InfoBar";
import Button from "../global/Button.component";
import { Box, Typography } from "@material-ui/core";
const FlowContainer: React.FC<FlowContainerProps> = ({ isExpense, data }) => {
  return (
    <Box width="50%" mt={3} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          There are {data.length} total {isExpense ? "expenses" : "incomes"}
        </Typography>
        <Button>Add {isExpense ? "Expense" : "Income"}</Button>
      </Box>
      <Box mt={2}>
        {data.map((obj) => (
          <InfoBar {...obj} key={obj.id} />
        ))}
      </Box>
    </Box>
  );
};

export default FlowContainer;

interface FlowContainerProps {
  isExpense?: true;
  data: DemoDataExpense[] | DemoDataIncome[];
}
