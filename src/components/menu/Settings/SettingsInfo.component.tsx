import { IconButton, Typography, Box, TextField } from "@material-ui/core";
import { Edit, Done, Clear } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateUserSettings } from "../../../utils/db";

const SettingsInfo: React.FC<SettingsInfoProps> = ({
  title,
  content,
  query,
  setIsUpdated,
  isUpdated,
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
      if (query === "displayName" || query === "email") {
        await updateUserPersonalInfo(query, newVal);
      } else {
        await updateUserSettings(uid, query, newVal);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = () => {
    if (!toEdit) setToEdit(true);
    else {
      if (!currentUser) return;
      editUserInfo(currentUser.uid, query, value)
        .then(() => {
          setIsUpdated(true);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Typography>{title}</Typography>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        alignItems="center"
        component={toEdit ? "form" : "div"}
      >
        {toEdit ? (
          <TextField
            value={value}
            color="primary"
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <Typography>{content || "No Info"}</Typography>
        )}
        <Box>
          <IconButton onClick={handleClick}>
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
}
