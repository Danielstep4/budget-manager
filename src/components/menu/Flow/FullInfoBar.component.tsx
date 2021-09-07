import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUserCategories } from "../../../utils/db/user";
import Autocomplete from "../../global/Autocomplete.component";
import DatePicker from "../../global/DatePicker.component";
import TextInput from "../../global/TextInput.component";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  id,
  title,
  seconds,
  category,
  amount,
  isExpense,
}) => {
  const { currentUser } = useAuth();
  const DATE = new Date(seconds * 1000);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDate, setEditDate] = useState(DATE);
  const [editCategory, setEditCategory] = useState(category);
  const [editAmount, setEditAmount] = useState(amount.toString());
  const [categoryDate, setCategoryData] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      getUserCategories(currentUser.uid)
        .then((result) => result && setCategoryData(result))
        .catch(console.log);
    }
  }, []);
  return (
    <Box p={1}>
      <Typography color="primary" variant="h5">
        Edit
        {isExpense ? " Expense" : " Income"}
        {" - #" + id.slice(0, 7).toUpperCase()}
      </Typography>
      {isEdit ? (
        <Box p={2} component="form">
          <TextInput
            id="title"
            label="Title"
            value={editTitle}
            setValue={setEditTitle}
          />
          <DatePicker id="date" date={editDate} setDate={setEditDate} />
          <Autocomplete
            id="category"
            data={categoryDate}
            value={editCategory}
            setValue={setEditCategory}
          />
          <TextInput
            id="amount"
            label="Amount"
            value={editAmount}
            setValue={setEditAmount}
          />
        </Box>
      ) : (
        "Hello world"
      )}
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
