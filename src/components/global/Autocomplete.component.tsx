import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { Autocomplete as AutoComplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.light,
    },
  },
}));
/** Props: id?, label?, type?, className?, autoFocus?, value, setValue, data*/
const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  label,
  type,
  className,
  autoFocus,
  value,
  setValue,
  data,
}) => {
  const classes = useStyles();
  const { formValidation, removeField } = useError();
  console.log(data);
  return (
    <AutoComplete
      options={data}
      getOptionLabel={(option) => option}
      freeSolo
      classes={{
        inputRoot: classes.notchedOutline,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          id={id}
          label={label}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (!!formValidation.fields[id]) removeField(id);
          }}
          type={type}
          autoFocus={autoFocus}
          required
          fullWidth
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
      )}
    />
  );
};

export default Autocomplete;
interface AutocompleteProps {
  type?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  id: string;
  className?: string;
  autoFocus?: boolean;
  data: string[];
}
