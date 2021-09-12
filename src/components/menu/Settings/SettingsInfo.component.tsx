import React, { useState, useEffect, FormEvent } from "react";
import { IconButton, Typography, Box, TextField } from "@material-ui/core";
import { Edit, Done, Clear } from "@material-ui/icons";
import { useAuth } from "../../../context/AuthContext";
import { updateUserInfo } from "../../../utils/db/user";
import Autocomplete from "../../global/Autocomplete.component";
import { validateSettingsForm } from "../../../utils/forms-validation/settingsFormValidation";
import { useError } from "../../../context/ErrorContext";

const SettingsInfo: React.FC<SettingsInfoProps> = ({
  title,
  content,
  query,
  setIsUpdated,
  isUpdated,
  inputType,
  autocomplete,
  autocompleteData,
}) => {
  // Hooks
  const { currentUser, updateUserPersonalInfo } = useAuth();
  const { formValidation, removeField, handleFormValidation } = useError();

  // State
  const [toEdit, setToEdit] = useState(false);
  const [value, setValue] = useState(content);
  const FIELD_ID = `settings_${query}`;
  const fieldInValidation = formValidation.fields[FIELD_ID];
  const fieldExistInValidation = !!fieldInValidation;
  // useEffects
  useEffect(() => {
    if (!isUpdated) {
      setToEdit(false);
    }
  }, [isUpdated]);
  // Helper Functions
  const editUserInfo = async (
    uid: string | null,
    query: string,
    newVal: string
  ) => {
    if (!uid) return;
    const validation = validateSettingsForm(FIELD_ID, newVal);
    if (validation === true) {
      try {
        if (
          query === "displayName" ||
          query === "email" ||
          query === "photoURL"
        ) {
          await updateUserPersonalInfo(query, newVal);
        } else {
          await updateUserInfo(uid, query, newVal);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      handleFormValidation(validation);
      return Promise.reject("Invalid input.");
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    editUserInfo(currentUser.uid, query, value)
      .then(() => {
        setToEdit(false);
        setIsUpdated(true);
      })
      .catch((e) => console.log(e));
  };
  const handleClick = () => {
    setToEdit(true);
  };

  return (
    <>
      <Typography style={{ textTransform: "capitalize" }}>{title}</Typography>
      <Box
        display="grid"
        gridTemplateColumns="2fr 1fr"
        alignItems="center"
        component={toEdit ? "form" : "div"}
        onSubmit={handleSubmit}
      >
        {toEdit ? (
          autocomplete && autocompleteData ? (
            <Autocomplete
              id={FIELD_ID}
              value={value}
              setValue={setValue}
              data={autocompleteData}
            />
          ) : (
            <TextField
              value={value}
              color="primary"
              fullWidth
              id={FIELD_ID}
              type={inputType}
              onChange={(e) => {
                setValue(e.target.value);
                if (fieldExistInValidation) removeField(FIELD_ID);
              }}
              error={fieldExistInValidation}
              helperText={
                fieldExistInValidation ? fieldInValidation.message : ""
              }
            />
          )
        ) : (
          <Typography color="primary">
            {content
              ? content.length > 25
                ? content.slice(0, 25) + "..."
                : content
              : "No Info"}
          </Typography>
        )}
        <Box>
          <IconButton
            onClick={toEdit ? handleSubmit : handleClick}
            type={toEdit ? "submit" : "button"}
          >
            {toEdit ? <Done /> : <Edit />}
          </IconButton>
          {toEdit && (
            <IconButton onClick={() => setToEdit(false)}>
              <Clear />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SettingsInfo;

interface SettingsInfoProps {
  title: string;
  content: string;
  query: string;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  inputType?: string;
  autocomplete?: boolean;
  autocompleteData?: string[];
}
