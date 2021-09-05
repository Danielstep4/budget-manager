import { Field } from "../context/ErrorContext";

const validateInputEmail = (formField: FormField): true | Field => {
  const { id, val } = formField;
  if (val.includes("@")) return true;
  return {
    [id]: { message: "Please Provide An Email" },
  };
};
const validateInputPassword = (formField: FormField): true | Field => {
  return true;
};
const validateInputName = (formField: FormField): true | Field => {
  return true;
};
/** @param formFields is an object with id that includes the type of the input in lowercase, and the value.  */
export const validateAuthForm = (formFields: FormField[]): true | Field => {
  for (let formField of formFields) {
    if (formField.id.includes("email")) return validateInputEmail(formField);
    else if (formField.id.includes("password"))
      return validateInputPassword(formField);
    else if (formField.id.includes("name")) return validateInputName(formField);
  }
  return true;
};
interface FormField {
  id: string;
  val: string;
}
