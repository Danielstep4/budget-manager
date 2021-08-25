import { Box, Typography } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import { useState } from "react";
import Button from "../global/Button.component";

const NewFlow: React.FC<NewFlowProps> = ({ isExpense }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  return (
    <>
      <Typography variant="h4">
        New {isExpense ? "Expense" : "Income"}
      </Typography>
      <Box p={2} component="form">
        <TextInput label="Title" value={title} setValue={setTitle} />
        <TextInput label="Date" value={date} setValue={setDate} />
        <TextInput label="Category" value={category} setValue={setCategory} />
        <TextInput label="Price" value={price} setValue={setPrice} />
        <Box mt={1}>
          <Button>Submit</Button>
        </Box>
      </Box>
    </>
  );
};

export default NewFlow;

interface NewFlowProps {
  isExpense?: true;
}
