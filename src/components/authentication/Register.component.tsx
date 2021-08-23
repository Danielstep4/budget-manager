import { Box, Typography, useTheme } from "@material-ui/core";
import TextInput from "../global/TextInput.component";
import Button from "../global/Button.component";
import TextButton from "../global/TextButton.component";
const Register: React.FC = () => {
  const theme = useTheme();
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
          <Typography variant="h4">Welcome to</Typography>
          <Box mx={0.5}></Box>
          <Typography color="primary" variant="h4">
            Budget Manager
          </Typography>
        </Box>
        <Box component="form" py={2}>
          <TextInput type="text" label="Full Name" id="fullname" autoFocus />
          <TextInput type="email" label="Email" id="email" />
          <TextInput type="password" label="Password" id="password" />
          <TextInput
            type="password"
            label="Confirm Password"
            id="confirm-password"
          />
          <Box
            display="flex"
            justifyContent="space-between"
            color="white"
            alignItems="baseline"
            py={2}
          >
            <Button>Register</Button>
            <Box display="flex" alignItems="baseline">
              <Typography>Already have a user? </Typography>
              <TextButton>click here</TextButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
