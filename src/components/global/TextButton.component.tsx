import { Button, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    color: theme.palette.primary.light,
  },
}));
interface TextButtonProps {
  href?: string;
  onClick?: () => void;
}
const TextButton: React.FC<TextButtonProps> = ({ children, href, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      variant="text"
      color="primary"
      disableRipple
      classes={{
        textPrimary: classes.text,
      }}
      href={href}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default TextButton;
