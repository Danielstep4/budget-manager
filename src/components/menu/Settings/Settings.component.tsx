import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAuth, UserPersonalInfo } from "../../../context/AuthContext";
import { useBackdrop } from "../../../context/BackdropContext";
import { getUserInfo, UserDocument } from "../../../utils/db/user";
import Button from "../../global/Button.component";
import ChangePassword from "./ChangePassword.component";
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
        if (!response) return;
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
          gridTemplateColumns="1fr 2fr"
          alignItems="center"
          p={1}
        >
          <SettingsInfo
            title="currency"
            content={user && user.currency}
            query="currency"
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
            autocomplete
            autocompleteData={["ILS"]}
          />
          <SettingsInfo
            title="Saving Goal (%)"
            content={user && user.savingGoal}
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
          gridTemplateColumns="1fr 2fr"
          alignItems="center"
          p={1}
        >
          {Object.keys(userPersonalInfo).map((key) => (
            <SettingsInfo
              key={key}
              title={key.toLowerCase()}
              /// @ts-ignore
              content={userPersonalInfo[key]}
              query={key}
              inputType={key === "email" ? key : undefined}
              setIsUpdated={setIsUpdated}
              isUpdated={isUpdated}
            />
          ))}
        </Box>
      </Box>
      <Box p={1}>
        <Typography variant="h6" color="primary">
          Change Password
        </Typography>
        <ChangePassword />
      </Box>
    </>
  );
};

export default Settings;
