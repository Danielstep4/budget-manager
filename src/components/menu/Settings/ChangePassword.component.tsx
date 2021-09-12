import { Box, Typography } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useError } from "../../../context/ErrorContext";
import { validateAuthForm } from "../../../utils/forms-validation/authFormValidation";
import Button from "../../global/Button.component";
import TextInput from "../../global/TextInput.component";

const ChangePassword = () => {
  const { changeUserPassword } = useAuth();
  const { handleFormValidation, createSnackError } = useError();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword)
      return handleFormValidation({
        change_password_confirm_new: {
          message: "Please make sure both passwords are the same.",
        },
        change_password_new: {
          message: "Please make sure both passwords are the same.",
        },
      });
    const validation = validateAuthForm([
      { id: "change_password_new", val: newPassword },
      {
        id: "change_password_confirm_new",
        val: confirmNewPassword,
      },
    ]);
    if (validation === true) {
      changeUserPassword(oldPassword, newPassword)
        .then(() => setIsSuccess(true))
        .catch((e: any) => {
          if (typeof e === "string") {
            if (e.includes("old")) {
              createSnackError(e);
              handleFormValidation({
                change_password_old: {
                  message: "Invalid old password",
                },
              });
            }
          }
        });
    } else {
      handleFormValidation(validation);
    }
  };

  if (isSuccess)
    return (
      <Box p={1}>
        <Typography color="textSecondary">
          Your password has been changed
        </Typography>
      </Box>
    );
  return (
    <Box component="form" p={1} onSubmit={handleClick}>
      <TextInput
        value={oldPassword}
        setValue={setOldPassword}
        label="Old Password"
        type="password"
        id="change_password_old"
      />
      <TextInput
        value={newPassword}
        setValue={setNewPassword}
        label="New Password"
        type="password"
        id="change_password_new"
      />
      <TextInput
        value={confirmNewPassword}
        setValue={setconfirmNewPassword}
        label="Confirm New Password"
        type="password"
        id="change_password_confirm_new"
      />
      <Box mt={1}></Box>
      <Button submit>Change Password</Button>
    </Box>
  );
};

export default ChangePassword;
