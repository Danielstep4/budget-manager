import { Button as MaterialButton, makeStyles, Theme } from "@material-ui/core";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  submit?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  contained: {
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));
const Button: React.FC<ButtonProps> = ({ children, href, onClick, submit }) => {
  const classes = useStyles();
  return (
    <MaterialButton
      variant="contained"
      color="primary"
      disableRipple
      href={href}
      classes={{
        containedPrimary: classes.contained,
      }}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
