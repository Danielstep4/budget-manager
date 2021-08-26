import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useBackdrop } from "../../../context/BackdropContext";
import { getUserInfo, UserDocument } from "../../../utils/db";
import Button from "../../global/Button.component";
import SettingsInfo from "./SettingsInfo.component";

const Settings: React.FC = () => {
  // Hooks
  const { signOut, currentUser } = useAuth();
  const { setBackdropOpen } = useBackdrop();
  const [user, setUser] = useState<UserDocument | undefined>(undefined);
  const [isUpdated, setIsUpdated] = useState(false);
  // useEffects
  useEffect(() => {
    if (!currentUser) return;
    getUserInfo(currentUser.uid)
      .then((user) => {
        setUser(user);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsUpdated(false));
  }, [currentUser, isUpdated]);
  // Helper Functions
  const handleLogoutClick = () => {
    setBackdropOpen(false);
    signOut();
  };
  if (!user || !currentUser) return null;
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Settings</Typography>
        <Button onClick={handleLogoutClick}>Logout</Button>
      </Box>
      <Box p={1}>
        <Typography variant="h6" color="primary">
          General
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          alignItems="center"
          p={1}
        >
          <SettingsInfo
            title="Currency"
            content={user.currency}
            id={currentUser.uid}
            query="currency"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
          <SettingsInfo
            title="Savings Goal (%)"
            content={user.savingGoal}
            id={currentUser.uid}
            query="savingGoal"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
        </Box>
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
          <SettingsInfo
            title="Full Name"
            content={user.name}
            id={currentUser.uid}
            query="name"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
          <SettingsInfo
            title="Email"
            content={user.email}
            id={currentUser.uid}
            query="email"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
        </Box>
      </Box>
      <Box p={1}>
        <Typography variant="h6" color="primary">
          Change Password
        </Typography>
      </Box>
    </>
  );
};

export default Settings;
