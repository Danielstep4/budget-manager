import { makeStyles, TextField, Theme } from "@material-ui/core";

interface TextInputProps {
  id?: string;
  label: string;
  type: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  Input: {
    color: theme.palette.common.white,
  },
  InputLabel: {
    color: theme.palette.primary.light,
  },
  notchedOutline: {
    borderColor: theme.palette.primary.light,
    "&:hover": {
      borderColor: theme.palette.common.white,
    },
  },
  Focused: {
    borderColor: theme.palette.common.white,
  },
  Border: {
    "&:hover": {
      borderColor: theme.palette.common.white,
    },
  },
}));
const TextInput: React.FC<TextInputProps> = ({ id, label, type, ...rest }) => {
  const classes = useStyles();
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      type={type}
      autoFocus
      required
      fullWidth
      {...rest}
      InputProps={{
        classes: {
          root: classes.Input,
          focused: classes.Focused,
          notchedOutline: classes.notchedOutline,
        },
      }}
      InputLabelProps={{
        classes: {
          root: classes.InputLabel,
          outlined: classes.Border,
        },
      }}
    />
  );
};

export default TextInput;
