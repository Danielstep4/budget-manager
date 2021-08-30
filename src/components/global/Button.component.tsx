import { Button as MaterialButton } from "@material-ui/core";

const Button: React.FC<ButtonProps> = ({ children, href, onClick, submit }) => {
  return (
    <MaterialButton
      variant="contained"
      color="primary"
      disableRipple
      href={href}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {children}
    </MaterialButton>
  );
};
export default Button;

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  submit?: boolean;
}
