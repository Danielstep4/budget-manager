import {
  Avatar,
  Box,
  IconButton,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AccountBalance, Settings as SettingsIcon } from "@material-ui/icons";
import Settings from "./Settings/Settings.component";
import { useState, useEffect } from "react";
import { useBackdrop } from "../../context/BackdropContext";
import MenuExtended from "./MenuExtended.component";
import { useAuth } from "../../context/AuthContext";

const Menu: React.FC = () => {
  // Hooks
  const theme = useTheme();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const { currentUser } = useAuth();
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  const [settingsOpen, setSettingsOpen] = useState(false);
  // useEffects
  useEffect(() => {
    setBackdropOpen(settingsOpen);
  }, [settingsOpen, setBackdropOpen]);
  useEffect(() => {
    if (!backdropOpen) setSettingsOpen(false);
  }, [backdropOpen]);
  // Helper Functions
  const handleSettingsButton = () => {
    setBackdropOpen(false);
    setTimeout(() => setSettingsOpen(!settingsOpen), 0);
  };

  return (
    <>
      <Box
        minHeight={matchesXSmall ? "0" : "650px"}
        width={matchesXSmall ? "100vw" : theme.sizes.menuWidth + "px"}
        bgcolor={theme.palette.background.paper}
        height={matchesXSmall ? theme.sizes.menuWidth : "100vh"}
        position="fixed"
        top="0"
        zIndex="2"
      >
        <Box
          bgcolor={theme.palette.primary.main}
          width={theme.sizes.menuWidth + "px"}
          height={theme.sizes.menuWidth + "px"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={theme.sizes.menuWidth / 2 + "px"}
        >
          <SvgIcon fontSize="inherit">
            <AccountBalance />
          </SvgIcon>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          width={matchesXSmall ? "auto" : "100%"}
          height={matchesXSmall ? "100%" : "auto"}
          alignItems="center"
          position="absolute"
          bottom={matchesXSmall ? "0" : theme.sizes.menuWidth + 10 + "px"}
          right={matchesXSmall ? theme.sizes.menuWidth + 10 + "px" : "auto"}
        >
          <IconButton onClick={handleSettingsButton}>
            <SettingsIcon color="action" />
          </IconButton>
        </Box>
        <Box
          width={theme.sizes.menuWidth + "px"}
          height={theme.sizes.menuWidth + "px"}
          position="absolute"
          bottom="0"
          left={matchesXSmall ? "auto" : "0"}
          right={matchesXSmall ? "0" : "auto"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTop={
            matchesXSmall ? "none" : "0.5px solid" + theme.palette.grey[500]
          }
        >
          <Avatar
            alt="default"
            src={currentUser!.photoURL || ""}
            style={{
              width: `${theme.sizes.menuWidth * 0.75 + "px"}`,
              height: `${theme.sizes.menuWidth * 0.75 + "px"}`,
            }}
          />
        </Box>
      </Box>
      {settingsOpen && (
        <MenuExtended>
          <Settings />
        </MenuExtended>
      )}
    </>
  );
};

export default Menu;
