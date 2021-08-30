import React, { useState, useEffect, FormEvent } from "react";
import { IconButton, Typography, Box, TextField } from "@material-ui/core";
import { Edit, Done, Clear } from "@material-ui/icons";
import { useAuth } from "../../../context/AuthContext";
import { updateUserSettings } from "../../../utils/db/user";

const SettingsInfo: React.FC<SettingsInfoProps> = ({
  title,
  content,
  query,
  setIsUpdated,
  isUpdated,
  inputType,
}) => {
  // Hooks
  const [toEdit, setToEdit] = useState(false);
  const [value, setValue] = useState(content);
  const { currentUser, updateUserPersonalInfo } = useAuth();
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
    try {
      if (
        query === "displayName" ||
        query === "email" ||
        query === "photoURL"
      ) {
        await updateUserPersonalInfo(query, newVal);
      } else {
        await updateUserSettings(uid, query, newVal);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    editUserInfo(currentUser.uid, query, value)
      .then(() => {
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
          <TextField
            value={value}
            color="primary"
            fullWidth
            type={inputType}
            onChange={(e) => setValue(e.target.value)}
          />
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
}
