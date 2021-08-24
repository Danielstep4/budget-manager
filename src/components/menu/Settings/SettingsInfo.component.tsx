import { IconButton, Typography, Box, TextField } from "@material-ui/core";
import { Edit, Done, Clear } from "@material-ui/icons";
import React, { useState } from "react";

const SettingsInfo: React.FC<SettingsInfoProps> = ({ title, content }) => {
  // Hooks
  const [toEdit, setToEdit] = useState(false);
  const [value, setValue] = useState(content);
  // Helper Functions
  const handleClick = () => {
    if (!toEdit) setToEdit(true);
    else {
      // #TODO: send request to change the value
      setToEdit(false);
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
}
