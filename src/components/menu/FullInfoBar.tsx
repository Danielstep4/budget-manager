import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useFlow } from "../../context/FlowContext";
import SettingsInfo from "./Settings/SettingsInfo.component";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  id,
  title,
  seconds,
  category,
  amount,
  isExpense,
}) => {
  const { handleFlowUpdated } = useFlow();
  const [isUpdated, setIsUpdated] = useState(false);
  const DATE = new Date(seconds * 1000).toDateString();
  return (
    <Box>
      <Typography color="primary" variant="h5">
        {isExpense ? " Expense" : " Income"}
        {" - #" + id.slice(0, 7).toUpperCase()}
      </Typography>
      <Box
        p={2}
        display="grid"
        gridTemplateColumns="1fr 1fr"
        alignItems="center"
      >
        <SettingsInfo
          title="title"
          content={title}
          query={id}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
        />
      </Box>
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
