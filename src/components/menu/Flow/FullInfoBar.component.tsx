import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FlowForm from "./FlowForm.component";

const FullInfoBar: React.FC<FullInfoBarProps> = (props) => {
  const [isEdit, setIsEdit] = useState(true);

  return (
    <Box p={1}>
      {isEdit ? (
        <FlowForm {...props}>
          <Typography color="primary" variant="h5">
            Edit
            {props.isExpense ? " Expense" : " Income"}
            {" - #" + props.id.slice(0, 7).toUpperCase()}
          </Typography>
        </FlowForm>
      ) : (
        // TODO: Add content if isEdit is false
        "Hello world"
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
