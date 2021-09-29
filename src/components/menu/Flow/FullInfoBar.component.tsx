import { Box, Typography, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useBackdrop } from "../../../context/BackdropContext";
import { useError } from "../../../context/ErrorContext";
import { useFlow } from "../../../context/FlowContext";
import InfoBarPie from "../../content/Charts/InfoBarPie.component";
import Button from "../../global/Button.component";
import FlowForm from "./FlowForm.component";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  isExpense,
  id,
  ...rest
}) => {
  // Hooks
  const { currentUser } = useAuth();
  const { handleFlowUpdated, removeFlow } = useFlow();
  const { setBackdropOpen } = useBackdrop();
  const { createSnackError } = useError();
  // State
  const [isEdit, setIsEdit] = useState(false);
  // Props
  const { title, seconds, category, amount } = rest;
  // Helper Array
  const DATE = new Date(seconds * 1000);
  const contentStructureArray: ContentStructureArray[] = [
    { name: "Title", content: title },
    { name: "Date", content: DATE.toDateString() },
    { name: "Category", content: category },
    { name: "Amount", content: amount },
  ];
  const handleDeleteFlow = () => {
    if (!currentUser) return;
    removeFlow(
      { title, date: DATE, category, amount },
      currentUser.uid,
      id,
      isExpense
    )
      .then(() => {
        handleFlowUpdated();
        setBackdropOpen(false);
      })
      .catch(createSnackError);
  };
  return (
    <Box p={2} position="relative">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="primary" variant="h5">
          {isEdit && "Edit"}
          {isExpense ? " Expense" : " Income"}
          {" - #" + id.slice(0, 7).toUpperCase()}
        </Typography>
        <Box>
          <Button onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "Cancel" : "Edit"}
          </Button>
          {!isEdit && (
            <IconButton onClick={handleDeleteFlow}>
              <Delete />
            </IconButton>
          )}
        </Box>
      </Box>
      {isEdit ? (
        <FlowForm {...rest} isEdit={isEdit} isExpense={isExpense} id={id} />
      ) : (
        <Box position="relative">
          <Box display="grid" gridTemplateColumns="1fr 1fr" mt={4} p={2}>
            {contentStructureArray.map((item) => (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                mb={1}
                key={item.name}
              >
                <Typography variant="h6">{item.name}:</Typography>
                <Box mr={3}></Box>
                <Typography color="primary" variant="h6">
                  {item.content}
                </Typography>
              </Box>
            ))}
          </Box>
          <InfoBarPie isExpense={isExpense} amount={amount} />
        </Box>
      )}
    </Box>
  );
};

export default FullInfoBar;
interface ContentStructureArray {
  name: string;
  content: string | number;
}
interface FullInfoBarProps {
  id: string;
  title: string;
  seconds: number;
  category: string;
  amount: number;
  isExpense?: boolean;
}
