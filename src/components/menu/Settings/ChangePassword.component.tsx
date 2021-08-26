import { Box, Typography } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../global/Button.component";
import TextInput from "../../global/TextInput.component";

const ChangePassword = () => {
  const { changeUserPassword } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewpassword2] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== newPassword2) return;
    changeUserPassword(newPassword)
      .then(() => setIsSuccess(true))
      .catch((e) => console.log(e));
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
      />
      <TextInput
        value={newPassword}
        setValue={setNewPassword}
        label="New Password"
        type="password"
      />
      <TextInput
        value={newPassword2}
        setValue={setNewpassword2}
        label="Confirm New Password"
        type="password"
      />
      <Box mt={1}></Box>
      <Button submit>Change Password</Button>
    </Box>
  );
};

export default ChangePassword;
