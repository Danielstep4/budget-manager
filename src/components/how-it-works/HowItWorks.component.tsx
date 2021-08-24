import { useState } from "react";
import { IconButton, Box, useTheme, Typography } from "@material-ui/core";
import { HelpSharp, Close } from "@material-ui/icons";
const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Box
        position="fixed"
        bgcolor={theme.palette.background.paper}
        borderRadius={theme.shape.borderRadius}
        p={5}
        display={isOpen ? "block" : "none"}
        height="90%"
        width="90%"
        left="0"
        right="0"
        top="0"
        bottom="0"
        margin="auto"
        zIndex="2"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography color="primary" variant="h4">
            How It Works?
          </Typography>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <Close />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            optio, maxime in et doloribus corrupti odio aliquid facilis dolore,
            ad placeat accusantium nostrum asperiores. Excepturi illo nesciunt
            aut soluta quos?
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            optio, maxime in et doloribus corrupti odio aliquid facilis dolore,
            ad placeat accusantium nostrum asperiores. Excepturi illo nesciunt
            aut soluta quos?
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            optio, maxime in et doloribus corrupti odio aliquid facilis dolore,
            ad placeat accusantium nostrum asperiores. Excepturi illo nesciunt
            aut soluta quos?
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            optio, maxime in et doloribus corrupti odio aliquid facilis dolore,
            ad placeat accusantium nostrum asperiores. Excepturi illo nesciunt
            aut soluta quos?
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            optio, maxime in et doloribus corrupti odio aliquid facilis dolore,
            ad placeat accusantium nostrum asperiores. Excepturi illo nesciunt
            aut soluta quos?
          </Typography>
        </Box>
      </Box>
      <IconButton
        color="primary"
        style={{ position: "fixed", right: "5px", bottom: "5px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HelpSharp style={{ fontSize: "55px" }} />
      </IconButton>
      <Box
        display={isOpen ? "block" : "none"}
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="100vw"
        height="100vh"
        bgcolor="rgba(0, 0, 0, 0.4)"
        onClick={() => setIsOpen(!isOpen)}
        zIndex="1"
      ></Box>
    </>
  );
};

export default HowItWorks;
