import { Box, Typography, useTheme } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import Button from "../global/Button.component";

const Settings: React.FC = () => {
  const theme = useTheme();
  const { signOut } = useAuth();
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">Settings</Typography>
      <Button onClick={() => signOut()}>Logout</Button>
    </Box>
  );
};

export default Settings;
