import { Box, Typography, useTheme } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import Button from "../global/Button.component";
import TextButton from "../global/TextButton.component";
import { FormEvent, useState } from "react";
import firebase from "firebase/app";

interface AuthProps {
  isRegister: boolean;
}
const Auth: React.FC<AuthProps> = ({ isRegister }) => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(!isRegister);
  // Form Refrences
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // Form Handler
  const hanldeSubmit = (e: FormEvent) => {
    e.preventDefault();
    return isLogin ? handleLogin() : handleRegister();
  };
  const handleRegister = () => {
    console.log("Registering...");
    console.log(fullName, email, password, password2);
  };
  const handleLogin = () => {
    console.log("Logging in...");
    console.log(email, password);
    const emailPasswordAuthProvider = new firebase.auth.EmailAuthProvider();
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
        width="50%"
        maxWidth="690px"
        p={2}
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
            />
          )}
          <TextInput
            type="email"
            label="Email"
            id="email"
            autoFocus={isLogin}
            value={email}
            setValue={setEmail}
          />
          <TextInput
            type="password"
            label="Password"
            id="password"
            value={password}
            setValue={setPassword}
          />
          {!isLogin && (
            <TextInput
              type="password"
              label="Confirm Password"
              id="confirm-password"
              value={password2}
              setValue={setPassword2}
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
