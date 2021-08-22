import React from "react";
import { Box, useTheme } from "@material-ui/core";
const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      minHeight="100vh"
      height="100%"
      color={theme.palette.common.white}
    >
      {children}
    </Box>
  );
};

export default Layout;
