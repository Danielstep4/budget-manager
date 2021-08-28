import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { getSymbol } from "../../utils/getSymbol";

const InfoBar: React.FC<InfoBarProps> = ({
  isExpense,
  id,
  date,
  category,
  amount,
  currency,
}) => {
  const theme = useTheme();
  console.log(date);
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
      <Typography>{"#" + id.slice(0, 7).toUpperCase()}</Typography>
      <Typography align="center" style={{ color: "#808080" }}>
        {new Date(date.seconds * 1000).toDateString()}
      </Typography>
      <Typography align="center">{category}</Typography>
      <Typography color={isExpense ? "error" : "textSecondary"} align="center">
        {amount + getSymbol(currency)}
      </Typography>
    </Box>
  );
};

export default InfoBar;

interface InfoBarProps {
  id: string;
  isExpense?: boolean;
  date: {
    seconds: number;
  };
  category: string;
  amount: number;
  currency: string;
}
