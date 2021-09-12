import { Field } from "../../context/ErrorContext";
import {
  validateInputIsNumber,
  FormField,
  validateInputString,
} from "./formValidatorsHelpers";

/**
 * @param {FormField[]} formFields is an object with id that includes the type of the input in lowercase, and the value.
 * @returns {true | Field} if the whole formFields array is valid returns true else returns Field to create an error in error context.
 */
export const validateFlowForm = (formFields: FormField[]): true | Field => {
  let correctFieldFlag: true | Field = true;
  for (let formField of formFields) {
    if (formField.id.includes("amount"))
      correctFieldFlag = validateInputIsNumber(formField);
    else if (formField.id.includes("title"))
      correctFieldFlag = validateInputString(formField);
    else if (formField.id.includes("category"))
      correctFieldFlag = validateInputString(formField);
    if (correctFieldFlag !== true) break;
  }
  return correctFieldFlag;
};
