import React from "react";
import { Box, useTheme } from "@material-ui/core";
const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      minHeight="650px"
      height="100vh"
      color={theme.palette.common.white}
    >
      {children}
    </Box>
  );
};

export default Layout;
