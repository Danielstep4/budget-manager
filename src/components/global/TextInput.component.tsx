import { makeStyles, TextField, Theme } from "@material-ui/core";
import { useError } from "../../context/ErrorContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "0.5rem 0",
  },
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
}));

/** Props: id?, label?, type?, className?, autoFocus?, value, setValue*/
const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type,
  className,
  autoFocus,
  value,
  setValue,
}) => {
  const classes = useStyles();
  const { formValidation, removeField } = useError();
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      variant="outlined"
      autoFocus={autoFocus}
      required
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (!!formValidation.fields[id]) removeField(id);
      }}
      InputProps={{
        classes: {
          root: classes.Input,
          notchedOutline: classes.notchedOutline,
        },
      }}
      InputLabelProps={{
        classes: {
          root: classes.InputLabel,
        },
      }}
      error={!!formValidation.fields[id]}
      helperText={
        formValidation.fields[id] ? formValidation.fields[id].message : ""
      }
      className={className || classes.root}
    />
  );
};
export default TextInput;

interface TextInputProps {
  type?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  id: string;
  className?: string;
  autoFocus?: boolean;
}
