import { Avatar, Box, IconButton, SvgIcon, useTheme } from "@material-ui/core";
import { AccountBalance, Settings as SettingsIcon } from "@material-ui/icons";
import Settings from "./Settings/Settings.component";
import { useState, useEffect } from "react";
import { useBackdrop } from "../../context/BackdropContext";
import MenuExtended from "./MenuExtended.component";

const Menu: React.FC = () => {
  // Hooks
  const theme = useTheme();
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  const [settingsOpen, setSettingsOpen] = useState(false);
  // useEffects
  useEffect(() => {
    setBackdropOpen(settingsOpen);
  }, [settingsOpen, setBackdropOpen]);
  useEffect(() => {
    if (!backdropOpen) setSettingsOpen(false);
  }, [backdropOpen]);

  // SidebarWidth
  return (
    <>
      <Box display="flex" maxWidth="50%">
        <Box
          minHeight="650px"
          width={theme.sizes.menuWidth + "px"}
          bgcolor={theme.palette.background.paper}
          height="100vh"
          position="relative"
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
            width="100%"
            alignItems="center"
            position="absolute"
            bottom={theme.sizes.menuWidth + 10 + "px"}
          >
            <IconButton onClick={() => setSettingsOpen(!settingsOpen)}>
              <SettingsIcon color="action" />
            </IconButton>
          </Box>
          <Box
            width={theme.sizes.menuWidth + "px"}
            height={theme.sizes.menuWidth + "px"}
            position="absolute"
            bottom="0"
            left="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderTop={"0.5px solid" + theme.palette.grey[500]}
          >
            <Avatar
              alt="default"
              style={{
                width: `${theme.sizes.menuWidth * 0.625 + "px"}`,
                height: `${theme.sizes.menuWidth * 0.625 + "px"}`,
              }}
            />
          </Box>
        </Box>
        {settingsOpen && (
          <MenuExtended>
            <Settings />
          </MenuExtended>
        )}
      </Box>
    </>
  );
};

export default Menu;
