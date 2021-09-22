import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useBackdrop } from "../../context/BackdropContext";
import { getSymbol } from "../../utils/getSymbol";
import FullInfoBar from "../menu/Flow/FullInfoBar.component";
import MenuExtended from "../menu/MenuExtended.component";

const InfoBar: React.FC<InfoBarProps> = ({
  isExpense,
  id,
  date,
  category,
  amount,
  title,
  currency,
}) => {
  const theme = useTheme();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  const [toEdit, setToEdit] = useState(false);
  const DATE = new Date(date.seconds * 1000);
  useEffect(() => {
    if (!backdropOpen) setToEdit(false);
  }, [backdropOpen]);
  useEffect(() => {
    if (toEdit) setBackdropOpen(true);
  }, [toEdit, setBackdropOpen]);

  return (
    <>
      <Box
        bgcolor={theme.palette.background.paper}
        display="grid"
        p={3}
        mt={2}
        gridTemplateColumns={`repeat(${matchesXSmall ? "3" : "4"}, 1fr)`}
        gridTemplateRows="1fr"
        alignItems="baseline"
        borderRadius={theme.shape.borderRadius}
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => setToEdit(true)}
      >
        {matchesXSmall ? null : (
          <Typography>{"#" + id.slice(0, 7).toUpperCase()}</Typography>
        )}
        <Typography align="center" style={{ color: "#A8A8A8" }}>
          {matchesSmall ? DATE.toLocaleDateString() : DATE.toDateString()}
        </Typography>
        <Typography align="center">
          {category[0].toUpperCase() + category.slice(1)}
        </Typography>
        <Typography
          color={isExpense ? "error" : "textSecondary"}
          align="center"
        >
          {amount.toString() + getSymbol(currency)}
        </Typography>
      </Box>
      {toEdit && (
        <MenuExtended>
          <FullInfoBar
            id={id}
            title={title}
            category={category}
            amount={amount}
            seconds={date.seconds}
            isExpense={isExpense}
          />
        </MenuExtended>
      )}
    </>
  );
};

export default InfoBar;

interface InfoBarProps {
  id: string;
  title: string;
  isExpense?: boolean;
  date: {
    seconds: number;
  };
  category: string;
  amount: number;
  currency: string;
}
