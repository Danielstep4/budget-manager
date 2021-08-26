import { Box, Typography } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import { FormEvent, useState } from "react";
import Button from "../global/Button.component";
import { addFlow } from "../../utils/db";
import { useAuth } from "../../context/AuthContext";

const NewFlow: React.FC<NewFlowProps> = ({ isExpense }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let intPrice = parseInt(price);
    console.log(intPrice);
    if (isNaN(intPrice)) return;
    addFlow(
      { title, date, category, price: intPrice },
      currentUser!.uid,
      isExpense
    )
      .then(() => console.log("success"))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Typography variant="h4">
        New {isExpense ? "Expense" : "Income"}
      </Typography>
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <TextInput label="Title" value={title} setValue={setTitle} />
        <TextInput label="Date" value={date} setValue={setDate} />
        <TextInput label="Category" value={category} setValue={setCategory} />
        <TextInput label="Price" value={price} setValue={setPrice} />
        <Box mt={1}>
          <Button submit>Submit</Button>
        </Box>
      </Box>
    </>
  );
};

export default NewFlow;

interface NewFlowProps {
  isExpense?: true;
}
