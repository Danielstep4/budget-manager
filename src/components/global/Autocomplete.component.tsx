import React from "react";
import { Autocomplete as AutoComplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { useError } from "../../context/ErrorContext";

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
  const { formValidation, removeField } = useError();
  return (
    <AutoComplete
      options={data}
      getOptionLabel={(option) => option}
      freeSolo
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
          fullWidth
          error={!!formValidation.fields[id]}
          helperText={
            formValidation.fields[id] ? formValidation.fields[id].message : ""
          }
          className={className}
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
