import { Box, useTheme } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

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
      width="100%"
      maxWidth="660px"
      top="0"
      left={theme.sizes.menuWidth + "px"}
      height="100%"
      style={{ userSelect: "none", overflowY: "auto" }}
    >
      {children}
    </Box>
  );
};

ReactDOM.createPortal(<MenuExtended />, document.getElementById("portal")!);
export default MenuExtended;
