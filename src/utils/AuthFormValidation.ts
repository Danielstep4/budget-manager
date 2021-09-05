import { Field } from "../context/ErrorContext";

const validateInputEmail = (formField: FormField): true | Field => {
  const { id, val } = formField;
  // Stackoverflow
  /* eslint-disable */
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  /* eslint-enable */

  return (
    re.test(val.toLowerCase()) || {
      [id]: { message: "Please Provide An Email" },
    }
  );
};
const validateInputPassword = (formField: FormField): true | Field => {
  return true;
};
const validateInputName = (formField: FormField): true | Field => {
  return true;
};
/**
 * @param {FormField[]} formFields is an object with id that includes the type of the input in lowercase, and the value.
 * @returns {true | Field} if the whole formFields array is valid returns true else returns Field to create an error in error context.
 */
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
