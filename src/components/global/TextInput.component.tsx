import { TextField } from "@material-ui/core";
import { useError } from "../../context/ErrorContext";

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
      error={!!formValidation.fields[id]}
      helperText={
        formValidation.fields[id] ? formValidation.fields[id].message : ""
      }
      className={className}
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
