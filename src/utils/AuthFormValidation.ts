import { Field } from "../context/ErrorContext";
import validator from "validator";

const validateInputEmail = (formField: FormField): true | Field => {
  const { id, val } = formField;

  return (
    validator.isEmail(val) || {
      [id]: { message: "Please Provide An Email!" },
    }
  );
};
const validateInputPassword = (formField: FormField): true | Field => {
  const { id, val } = formField;
  return (
    validator.isStrongPassword(val, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    }) || {
      [id]: {
        message:
          "Please provide a valid password between 6-16 characters.\n Must contain least one special character !@#$%^&*. \n Must contain at least 1 numeric character. \n Must contain at least 1 uppercase and lowercase character.",
      },
    }
  );
};

const validateInputName = (formField: FormField): true | Field => {
  const { id, val } = formField;
  const checkString = val
    .split(" ")
    .map((str) => str.trim())
    .join(" ");

  return (
    checkString.length <= 32 || {
      [id]: {
        message: "Full name can't be more than 32 characters.",
      },
    }
  );
};
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
      correctFieldFlag = validateInputName(formField);
    if (correctFieldFlag !== true) break;
  }
  return correctFieldFlag;
};
interface FormField {
  id: string;
  val: string;
}
