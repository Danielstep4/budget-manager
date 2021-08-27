import { useState, useEffect } from "react";
import InfoBar from "./InfoBar.component";
import Button from "../global/Button.component";
import { Box, Typography } from "@material-ui/core";
import MenuExtended from "../menu/MenuExtended.component";
import { useBackdrop } from "../../context/BackdropContext";
import NewFlow from "../menu/NewFlow.component";
import { FlowSchema } from "../../utils/db";
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
            There are {data ? data.length : 0} total{" "}
            {isExpense ? "expenses" : "incomes"}
          </Typography>
          <Button onClick={() => setIsOpen(!isOpen)}>
            Add {isExpense ? "Expense" : "Income"}
          </Button>
        </Box>
        <Box mt={1}>
          {data &&
            data.map((obj) => (
              <InfoBar
                {...obj}
                key={obj.id}
                isExpense={isExpense}
                currency="ILS"
              />
            ))}
        </Box>
      </Box>
      {isOpen && (
        <MenuExtended>
          <NewFlow isExpense={isExpense} />
        </MenuExtended>
      )}
    </>
  );
};

export default FlowContainer;

interface FlowContainerProps {
  isExpense?: boolean;
  data?: FlowSchema[];
}
