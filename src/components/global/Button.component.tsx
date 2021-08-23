import { Button as MaterialButton, makeStyles, Theme } from "@material-ui/core";

interface ButtonProps {
  href?: string;
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
const Button: React.FC<ButtonProps> = ({ children, href }) => {
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
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
