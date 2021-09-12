import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import InfoBarPie from "../../content/Charts/InfoBarPie.component";
import Button from "../../global/Button.component";
import FlowForm from "./FlowForm.component";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  isExpense,
  id,
  ...rest
}) => {
  const { title, seconds, category, amount } = rest;
  const contentStructureArray: ContentStructureArray[] = [
    { name: "Title", content: title },
    { name: "Date", content: new Date(seconds * 1000).toDateString() },
    { name: "Category", content: category },
    { name: "Amount", content: amount },
  ];
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Box p={2} position="relative">
      <Box display="flex" justifyContent="space-between">
        <Typography color="primary" variant="h5">
          {isEdit && "Edit"}
          {isExpense ? " Expense" : " Income"}
          {" - #" + id.slice(0, 7).toUpperCase()}
        </Typography>
        <Button onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </Box>
      {isEdit ? (
        <FlowForm {...rest} isEdit={isEdit} isExpense={isExpense} />
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
            {/* TODO: Add Graphs & Charts */}
          </Box>
          <InfoBarPie />
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
