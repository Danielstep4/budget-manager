import { Button } from "@material-ui/core";

const TextButton: React.FC<TextButtonProps> = ({ children, href, onClick }) => {
  return (
    <Button
      variant="text"
      color="primary"
      disableRipple
      href={href}
      onClick={onClick}
      style={{ textTransform: "capitalize", padding: 0 }}
    >
      {children}
    </Button>
  );
};

export default TextButton;

interface TextButtonProps {
  href?: string;
  onClick?: () => void;
}
