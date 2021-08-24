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
      display="flex"
      p={3}
      justifyContent="space-between"
      alignItems="baseline"
      borderRadius={theme.shape.borderRadius}
    >
      <Typography>{id}</Typography>
      <Typography>{date}</Typography>
      <Typography>{catagory}</Typography>
      <Typography color={!isExpense ? "error" : "textPrimary"}>
        {amount + getSymbol(currency)}
      </Typography>
    </Box>
  );
};

export default InfoBar;
