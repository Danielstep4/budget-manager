import { Avatar, Box, IconButton, SvgIcon, useTheme } from "@material-ui/core";
import { AccountBalance, Settings } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useBackdrop } from "../../context/BackdropContext";

const Menu: React.FC = () => {
  const theme = useTheme();
  const { setBackdropOpen, backdropOpen } = useBackdrop();
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    setBackdropOpen(settingsOpen);
  }, [settingsOpen]);
  useEffect(() => {
    if (!backdropOpen) setSettingsOpen(false);
  }, [backdropOpen]);
  return (
    <>
      <Box
        minHeight="650px"
        width="120px"
        bgcolor={theme.palette.background.paper}
        height="100vh"
        position="relative"
        zIndex={settingsOpen ? "2" : "0"}
      >
        <Box
          bgcolor={theme.palette.primary.main}
          width="120px"
          height="120px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="60px"
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
          bottom="130px"
        >
          <IconButton onClick={() => setSettingsOpen(!settingsOpen)}>
            <Settings color="action" />
          </IconButton>
        </Box>
        <Box
          width="120px"
          height="120px"
          position="absolute"
          bottom="0"
          left="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTop={"0.5px solid" + theme.palette.grey[50]}
        >
          <Avatar alt="default" style={{ width: "75px", height: "75px" }} />
        </Box>
      </Box>
    </>
  );
};

export default Menu;
