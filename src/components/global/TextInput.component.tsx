import { TextField } from "@material-ui/core";

interface TextInputProps {
  id?: string;
  label: string;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, type, ...rest }) => {
  return (
    <TextField id={id} label={label} variant="outlined" type={type} {...rest} />
  );
};

export default TextInput;
