import { TextField } from "@material-ui/core";
import { useError } from "../../context/ErrorContext";

/** Props: id, value, setValue, label?, type?, className?, autoFocus? */
const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type,
  className,
  autoFocus,
  value,
  setValue,
  required,
}) => {
  const { formValidation, removeField } = useError();
  const fieldInValidation = formValidation.fields[id];
  const fieldExistInValidation = !!fieldInValidation;
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      variant="outlined"
      autoFocus={autoFocus}
      required={required}
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (fieldExistInValidation) removeField(id);
      }}
      error={fieldExistInValidation}
      helperText={fieldExistInValidation ? fieldInValidation.message : ""}
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
  required?: boolean;
}
