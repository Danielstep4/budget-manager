import { Box, Typography } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import { useState } from "react";

const NewIncome: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  return (
    <>
      <Typography variant="h4">New Income</Typography>
      <Box p={2}>
        <TextInput label="Title" value={title} setValue={setTitle} />
        <TextInput label="Date" value={date} setValue={setDate} />
        <TextInput label="Category" value={category} setValue={setCategory} />
        <TextInput label="Price" value={price} setValue={setPrice} />
      </Box>
    </>
  );
};

export default NewIncome;
