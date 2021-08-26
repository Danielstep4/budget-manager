import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAuth, UserPersonalInfo } from "../../../context/AuthContext";
import { useBackdrop } from "../../../context/BackdropContext";
import { getUserInfo, UserDocument } from "../../../utils/db";
import Button from "../../global/Button.component";
import SettingsInfo from "./SettingsInfo.component";

const Settings: React.FC = () => {
  // Hooks
  const { signOut, currentUser, getUserPersonalInfo } = useAuth();

  const { setBackdropOpen } = useBackdrop();
  const [userPersonalInfo, setUserPersonalInfo] = useState<
    UserPersonalInfo | undefined
  >(undefined);
  const [user, setUser] = useState<UserDocument | undefined>(undefined);
  const [isUpdated, setIsUpdated] = useState(false);
  // useEffects
  useEffect(() => {
    if (!currentUser) return;
    setUserPersonalInfo(getUserPersonalInfo());
    getUserInfo(currentUser.uid)
      .then((response) => {
        setUser(response);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsUpdated(false);
      });
  }, [isUpdated, getUserPersonalInfo, currentUser]);
  // Helper Functions
  const handleLogoutClick = () => {
    setBackdropOpen(false);
    signOut();
  };
  if (!user || !currentUser || !userPersonalInfo) return null;
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
            content={user.currency || "None"}
            query="currency"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
          <SettingsInfo
            title="Savings Goal (%)"
            content={user.savingGoal || "None"}
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
            content={userPersonalInfo.name || ""}
            query="name"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
          <SettingsInfo
            title="Email"
            content={userPersonalInfo.email || "None"}
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
