import { Box, Typography } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import { FormEvent, useEffect, useState } from "react";
import { addFlow } from "../../utils/db/flow";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { getUserCategories } from "../../utils/db/user";
import Button from "../global/Button.component";
import DatePicker from "../global/DatePicker.component";
import Autocomplete from "../global/Autocomplete.component";

const NewFlow: React.FC<NewFlowProps> = ({ isExpense, setIsUpdated }) => {
  const { currentUser } = useAuth();
  const { createSnackError, handleFormValidation } = useError();
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    if (currentUser) {
      getUserCategories(currentUser.uid).then(
        (result) => result && setUsedCategories(result)
      );
    }
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let intAmount = parseInt(amount);
    if (isNaN(intAmount)) {
      handleFormValidation({
        flow_amount: {
          message: "Please Provide a number",
        },
      });
      return createSnackError("Please Provide a number");
    }
    addFlow(
      {
        title,
        date,
        category,
        amount: intAmount,
      },
      currentUser!.uid,
      isExpense
    )
      .then(() => setIsUpdated(true))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Typography variant="h4">
        New {isExpense ? "Expense" : "Income"}
      </Typography>
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          value={title}
          setValue={setTitle}
          id="flow_title"
        />
        <DatePicker date={date} setDate={setDate} />
        <Autocomplete
          data={usedCategories}
          value={category}
          setValue={setCategory}
          id="flow_category"
          label="Category"
        />
        <TextInput
          label="Amount"
          value={amount}
          setValue={setAmount}
          id="flow_amount"
        />
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
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}
