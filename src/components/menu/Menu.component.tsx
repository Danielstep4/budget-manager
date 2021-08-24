import { Avatar, Box, SvgIcon, useTheme } from "@material-ui/core";
import { AccountBalance, Settings } from "@material-ui/icons";

const Menu: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      minHeight="650px"
      width="120px"
      bgcolor={theme.palette.background.paper}
      height="100vh"
      position="relative"
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
        <SvgIcon>
          <Settings />
        </SvgIcon>
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
        <Avatar
          alt="default"
          src="https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg"
          style={{ width: "75px", height: "75px" }}
        />
      </Box>
    </Box>
  );
};

export default Menu;
