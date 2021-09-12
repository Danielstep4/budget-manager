import { Box } from "@material-ui/core";
import Button from "../../global/Button.component";
import React, { FormEvent, useEffect, useState } from "react";
import Autocomplete from "../../global/Autocomplete.component";
import DatePicker from "../../global/DatePicker.component";
import TextInput from "../../global/TextInput.component";
import { useError } from "../../../context/ErrorContext";
import { useFlow } from "../../../context/FlowContext";
import { useBackdrop } from "../../../context/BackdropContext";
import { useAuth } from "../../../context/AuthContext";
import { getUserCategories } from "../../../utils/db/user";
import { updateFlow } from "../../../utils/db/flow";
import { validateFlowForm } from "../../../utils/forms-validation/flowFormValidation";

const FlowForm: React.FC<FlowFormProps> = ({
  children,
  id,
  amount,
  date,
  title,
  category,
  isEdit,
  isExpense,
}) => {
  const { currentUser } = useAuth();
  const { handleFormValidation, createSnackError } = useError();
  const { setBackdropOpen } = useBackdrop();
  const { addFlow, handleFlowUpdated } = useFlow();
  // State
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  const [flowDate, setFlowDate] = useState(new Date(date || Date.now()));
  const [flowAmount, setFlowAmount] = useState(amount ? amount.toString() : "");
  const [flowTitle, setFlowTitle] = useState(title || "");
  const [flowCategory, setFlowCategory] = useState(category || "");
  //useEffects
  useEffect(() => {
    if (currentUser) {
      getUserCategories(currentUser.uid).then(
        (result) => result && setUsedCategories(result)
      );
    }
  }, [currentUser]);
  // Handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    return isEdit ? handleEditFlow() : handleNewFlow();
  };
  const createFlowObject = () => {
    const validation = validateFlowForm([
      {
        id: "flow_title",
        val: flowTitle,
      },
      { id: "flow_amount", val: flowAmount },
      { id: "flow_category", val: flowCategory },
    ]);
    if (validation === true) {
      return {
        title: flowTitle,
        date: flowDate,
        category: flowCategory,
        amount: +flowAmount,
      };
    } else {
      handleFormValidation(validation);
    }
  };
  const handleNewFlow = () => {
    const newFlow = createFlowObject();
    if (!newFlow) return;
    addFlow(newFlow, currentUser!.uid, isExpense)
      .then(() => {
        handleFlowUpdated();
        setBackdropOpen(false);
      })
      .catch(createSnackError);
  };
  const handleEditFlow = () => {
    console.log("hi");
    console.log(id);
    if (!id) return;
    const editedFlow = createFlowObject();
    if (!editedFlow) return;
    updateFlow(editedFlow, currentUser!.uid, id, isExpense)
      .then(() => {
        handleFlowUpdated();
        setBackdropOpen(false);
      })
      .catch(createSnackError);
  };

  return (
    <>
      {children}
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          value={flowTitle}
          setValue={setFlowTitle}
          id="flow_title"
        />
        <DatePicker id="flow_date" date={flowDate} setDate={setFlowDate} />
        <Autocomplete
          data={usedCategories}
          value={flowCategory}
          setValue={setFlowCategory}
          id="flow_category"
          label="Category"
          freeSolo
        />
        <TextInput
          label="Amount"
          value={flowAmount}
          setValue={setFlowAmount}
          id="flow_amount"
        />
        <Box mt={1}>
          <Button submit>{isEdit ? "Save" : "Submit"}</Button>
        </Box>
      </Box>
    </>
  );
};

export default FlowForm;

interface FlowFormProps {
  id?: string;
  title?: string;
  category?: string;
  amount?: number;
  date?: number;
  isExpense?: boolean;
  isEdit?: boolean;
}
