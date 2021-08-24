import { Box, Typography } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import { useBackdrop } from "../../context/BackdropContext";
import Button from "../global/Button.component";

const Settings: React.FC = () => {
  const { signOut } = useAuth();
  const { setBackdropOpen } = useBackdrop();
  const handleLogoutClick = () => {
    setBackdropOpen(false);
    signOut();
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">Settings</Typography>
      <Button onClick={handleLogoutClick}>Logout</Button>
    </Box>
  );
};

export default Settings;
