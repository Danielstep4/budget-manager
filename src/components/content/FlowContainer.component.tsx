import { useState, useEffect } from "react";
import { DemoDataExpense, DemoDataIncome } from "../../demo-data";
import InfoBar from "./InfoBar";
import Button from "../global/Button.component";
import { Box, Typography } from "@material-ui/core";
import MenuExtended from "../menu/MenuExtended.component";
import { useBackdrop } from "../../context/BackdropContext";
import NewExpense from "../menu/NewExpense.component";
import NewIncome from "../menu/NewIncome.component";
const FlowContainer: React.FC<FlowContainerProps> = ({ isExpense, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  // useEffects
  useEffect(() => {
    setBackdropOpen(isOpen);
  }, [isOpen, setBackdropOpen]);
  useEffect(() => {
    if (!backdropOpen) setIsOpen(false);
  }, [backdropOpen]);
  return (
    <>
      <Box width="50%" mt={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            There are {data.length} total {isExpense ? "expenses" : "incomes"}
          </Typography>
          <Button onClick={() => setIsOpen(!isOpen)}>
            Add {isExpense ? "Expense" : "Income"}
          </Button>
        </Box>
        <Box mt={1}>
          {data.map((obj) => (
            <InfoBar {...obj} key={obj.id} />
          ))}
        </Box>
      </Box>
      {isOpen && (
        <MenuExtended>
          {isExpense ? <NewExpense /> : <NewIncome />}
        </MenuExtended>
      )}
    </>
  );
};

export default FlowContainer;

interface FlowContainerProps {
  isExpense?: true;
  data: DemoDataExpense[] | DemoDataIncome[];
}
