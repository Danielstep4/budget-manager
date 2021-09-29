import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

const MenuExtended: React.FC = ({ children }) => {
  const theme = useTheme();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Box
      zIndex="2"
      borderRadius={matchesXSmall ? "0" : "0 50px 50px 0"}
      bgcolor={theme.palette.background.paper}
      borderLeft={
        matchesXSmall ? "none" : "1px solid " + theme.palette.grey[500]
      }
      p={3}
      position="fixed"
      width="100%"
      maxWidth={matchesXSmall ? "none" : theme.sizes.menuExtendedWidth}
      minHeight="650px"
      top="0"
      left={matchesXSmall ? "0" : theme.sizes.menuWidth + "px"}
      height="100%"
      style={{ userSelect: "none", overflowY: "auto" }}
    >
      {children}
    </Box>
  );
};

ReactDOM.createPortal(<MenuExtended />, document.getElementById("portal")!);
export default MenuExtended;
