import { Box, Typography } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import { FormEvent, useState } from "react";
import Button from "../global/Button.component";
import { addFlow } from "../../utils/db";
import { useAuth } from "../../context/AuthContext";
import { useBackdrop } from "../../context/BackdropContext";
import DatePicker from "../global/DatePicker.component";

const NewFlow: React.FC<NewFlowProps> = ({ isExpense }) => {
  const { currentUser } = useAuth();
  const { setBackdropOpen } = useBackdrop();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(new Date(Date.now()));
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let intAmount = parseInt(amount);
    if (isNaN(intAmount)) return;
    addFlow(
      {
        title,
        date: 0,
        category,
        amount: intAmount,
      },
      currentUser!.uid,
      isExpense
    )
      .then(() => setBackdropOpen(false))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Typography variant="h4">
        New {isExpense ? "Expense" : "Income"}
      </Typography>
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <TextInput label="Title" value={title} setValue={setTitle} />
        <DatePicker date={date} setDate={setDate} />
        <TextInput label="Category" value={category} setValue={setCategory} />
        <TextInput label="Amount" value={amount} setValue={setAmount} />
        <Box mt={1}>
          <Button submit>Submit</Button>
        </Box>
      </Box>
    </>
  );
};

export default NewFlow;

interface NewFlowProps {
  isExpense?: boolean;
}
