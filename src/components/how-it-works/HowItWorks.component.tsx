import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { HelpSharp } from "@material-ui/icons";
const HowItWorks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        color="primary"
        style={{ position: "fixed", right: "5px", bottom: "5px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HelpSharp style={{ fontSize: "55px" }} />
      </IconButton>
    </>
  );
};

export default HowItWorks;
