import { Field } from "../../context/ErrorContext";
import {
  validateInputPassword,
  validateInputString,
  validateInputEmail,
  FormField,
} from "./formValidatorsHelpers";

/**
 * @param {FormField[]} formFields is an object with id that includes the type of the input in lowercase, and the value.
 * @returns {true | Field} if the whole formFields array is valid returns true else returns Field to create an error in error context.
 */
export const validateAuthForm = (formFields: FormField[]): true | Field => {
  let correctFieldFlag: true | Field = true;
  for (let formField of formFields) {
    if (formField.id.includes("email"))
      correctFieldFlag = validateInputEmail(formField);
    else if (formField.id.includes("password"))
      correctFieldFlag = validateInputPassword(formField);
    else if (formField.id.includes("fullname"))
      correctFieldFlag = validateInputString(formField);
    if (correctFieldFlag !== true) break;
  }
  return correctFieldFlag;
};
