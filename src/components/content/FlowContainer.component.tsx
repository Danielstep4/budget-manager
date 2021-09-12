import { useState, useEffect } from "react";
import InfoBar from "./InfoBar.component";
import Button from "../global/Button.component";
import { Box, Typography } from "@material-ui/core";
import MenuExtended from "../menu/MenuExtended.component";
import { useBackdrop } from "../../context/BackdropContext";
import { FlowDocument } from "../../utils/db/flow";
import FlowForm from "../menu/Flow/FlowForm.component";

const FlowContainer: React.FC<FlowContainerProps> = ({
  isExpense,
  data,
  currency,
}) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  const showData = showMore ? data : data?.slice(0, 2);
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
          <Box width="130px">
            <Button onClick={() => setIsOpen(!isOpen)} fullWidth>
              Add {isExpense ? "Expense" : "Income"}
            </Button>
          </Box>
        </Box>
        <Box mt={1}>
          {showData &&
            showData.map((obj) => (
              <InfoBar
                {...obj}
                key={obj.id}
                isExpense={isExpense}
                currency={currency}
              />
            ))}
          {data && data.length > 2 && (
            <Box mt={1}>
              <Button onClick={() => setShowMore(!showMore)}>
                {!showMore ? "See More" : "Show Less"}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {isOpen && (
        <MenuExtended>
          <FlowForm isExpense={isExpense}>
            <Typography variant="h4" color="primary">
              New {isExpense ? "Expense" : "Income"}
            </Typography>
          </FlowForm>
        </MenuExtended>
      )}
    </>
  );
};

export default FlowContainer;

interface FlowContainerProps {
  isExpense?: boolean;
  data?: FlowDocument[];
  currency: string;
}
