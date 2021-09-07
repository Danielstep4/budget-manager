import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "../../global/Button.component";
import FlowForm from "./FlowForm.component";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  isExpense,
  id,
  ...rest
}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Box p={2} position="relative">
      <Box position="absolute" right="0">
        <Button onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </Box>
      {isEdit ? (
        <FlowForm {...rest} isEdit={isEdit} isExpense={isExpense}>
          <Typography color="primary" variant="h5">
            Edit
            {isExpense ? " Expense" : " Income"}
            {" - #" + id.slice(0, 7).toUpperCase()}
          </Typography>
        </FlowForm>
      ) : (
        <Box>
          <Typography variant="h5" color="primary">
            {isExpense ? "Expense" : "Income"} - #{id.slice(0, 7).toUpperCase()}
          </Typography>
          {/* TODO: design what charts to see with the basic content */}
        </Box>
      )}
    </Box>
  );
};

export default FullInfoBar;

interface FullInfoBarProps {
  id: string;
  title: string;
  seconds: number;
  category: string;
  amount: number;
  isExpense?: boolean;
}
