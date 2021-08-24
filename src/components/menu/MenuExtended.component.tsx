import { Box, useTheme } from "@material-ui/core";
import React from "react";

const MenuExtended: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      zIndex="2"
      borderRadius="0 50px 50px 0"
      bgcolor={theme.palette.background.paper}
      borderLeft={"1px solid " + theme.palette.grey[500]}
      p={3}
      position="fixed"
      width="40%"
      maxWidth="660px"
      left="120px"
      height="100vh"
      style={{ userSelect: "none" }}
    >
      {children}
    </Box>
  );
};

export default MenuExtended;
