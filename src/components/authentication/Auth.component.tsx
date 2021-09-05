import { Box, Typography, useTheme } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import Button from "../global/Button.component";
import TextButton from "../global/TextButton.component";
import { FormEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import firebase from "firebase";
import { validateAuthForm } from "../../utils/authFormValidation";

const Auth: React.FC<AuthProps> = ({ isRegister }) => {
  // Hooks
  const theme = useTheme();
  const { handleFormValidation, createSnackError } = useError();
  const [isLogin, setIsLogin] = useState(!isRegister);
  const { signup, login } = useAuth();
  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Form Handler
  const hanldeSubmit = (e: FormEvent) => {
    e.preventDefault();
    return isLogin ? handleLogin() : handleRegister();
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return handleFormValidation({
        "confirm-password": {
          message: "Please make sure both passwords are the same.",
        },
        password: {
          message: "Please make sure both passwords are the same.",
        },
      });
    }
    try {
      const validation = validateAuthForm([
        { id: "email", val: email },
        { id: "password", val: password },
        { id: "fullname", val: fullName },
      ]);
      if (validation === true) {
        await signup(email, password, fullName);
      } else {
        handleFormValidation(validation);
      }
      localStorage.setItem("hasAccount", "true");
    } catch (e: any) {
      const err: firebase.auth.Error = e;
      createSnackError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const validation = validateAuthForm([{ id: "email", val: email }]);
      console.log(validation);
      if (validation === true) {
        await login(email, password);
      } else {
        handleFormValidation(validation);
      }
    } catch (e: any) {
      const err: firebase.auth.Error = e;
      createSnackError(err.message);
      if (err.code === "auth/user-not-found")
        createSnackError("User is not Found.");
    }
  };

  return (
    <Box
      height="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="100%"
        maxWidth="690px"
        p={2}
        m={2}
        bgcolor={theme.palette.background.paper}
        borderRadius={theme.shape.borderRadius}
        boxShadow={theme.shadows[3]}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="baseline"
        >
          {!isLogin ? (
            <Typography variant="h4">Welcome to</Typography>
          ) : (
            <Typography variant="h4">Welcome back to</Typography>
          )}
          <Box mx={0.5}></Box>
          <Typography color="primary" variant="h4">
            Budget Manager
          </Typography>
        </Box>
        <Box component="form" py={2} onSubmit={hanldeSubmit}>
          {!isLogin && (
            <TextInput
              type="text"
              label="Full Name"
              id="fullname"
              autoFocus={!isLogin}
              value={fullName}
              setValue={setFullName}
              required
            />
          )}
          <TextInput
            // type="email"
            label="Email"
            id="email"
            autoFocus={isLogin}
            value={email}
            setValue={setEmail}
            required
          />
          <TextInput
            type="password"
            label="Password"
            id="password"
            value={password}
            setValue={setPassword}
            required
          />
          {!isLogin && (
            <TextInput
              type="password"
              label="Confirm Password"
              id="confirm-password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              required
            />
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            color="white"
            alignItems="baseline"
            py={2}
          >
            <Button submit>{!isLogin ? "Register" : "Login"}</Button>
            <Box display="flex" alignItems="baseline">
              {!isLogin ? (
                <Typography>Already have a user? </Typography>
              ) : (
                <Typography>You dont have a user? </Typography>
              )}
              <TextButton onClick={() => setIsLogin(!isLogin)}>
                click here
              </TextButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;

interface AuthProps {
  isRegister: boolean;
}
