import { Box, Typography } from "@material-ui/core";
import { useAuth } from "../../../context/AuthContext";
import { useBackdrop } from "../../../context/BackdropContext";
import Button from "../../global/Button.component";
import SettingsInfo from "./SettingsInfo.component";

const Settings: React.FC = () => {
  const { signOut, currentUser } = useAuth();

  const { setBackdropOpen } = useBackdrop();
  const handleLogoutClick = () => {
    setBackdropOpen(false);
    signOut();
  };
  if (!currentUser) return null;
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Settings</Typography>
        <Button onClick={handleLogoutClick}>Logout</Button>
      </Box>
      <Box p={1}>
        <Typography variant="h6" color="primary">
          Personal Info
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          alignItems="center"
          p={1}
        >
          <SettingsInfo title="Full Name" content="Test" />
          <SettingsInfo title="Email" content={currentUser.email!} />
        </Box>
      </Box>
    </>
  );
};

export default Settings;
