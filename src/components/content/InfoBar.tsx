import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { getSymbol } from "../../utils/getSymbol";

interface InfoBarProps {
  id: string;
  isExpense?: boolean;
  date: string;
  catagory: string;
  amount: number;
  currency: string;
}
const InfoBar: React.FC<InfoBarProps> = ({
  isExpense,
  id,
  date,
  catagory,
  amount,
  currency,
}) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.paper}
      display="grid"
      p={3}
      mt={2}
      gridTemplateColumns="repeat(4, 1fr)"
      gridTemplateRows="1fr"
      alignItems="baseline"
      borderRadius={theme.shape.borderRadius}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <Typography>{"#" + id}</Typography>
      <Typography align="center">{date}</Typography>
      <Typography align="center">{catagory}</Typography>
      <Typography color={isExpense ? "error" : "textSecondary"} align="center">
        {amount + getSymbol(currency)}
      </Typography>
    </Box>
  );
};

export default InfoBar;
