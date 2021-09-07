import { Box, Typography } from "@material-ui/core";
import React from "react";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  id,
  title,
  seconds,
  category,
  amount,
  isExpense,
}) => {
  // const DATE = new Date(seconds * 1000).toDateString();
  return (
    <Box>
      <Typography color="primary" variant="h5">
        {isExpense ? " Expense" : " Income"}
        {" - #" + id.slice(0, 7).toUpperCase()}
      </Typography>
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
