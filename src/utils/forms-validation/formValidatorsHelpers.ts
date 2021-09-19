import { Field } from "../../context/ErrorContext";
import validator from "validator";

export const validateInputEmail = (formField: FormField): true | Field => {
  const { id, val } = formField;

  return (
    validator.isEmail(val) || {
      [id]: { message: "Please provide an email!" },
    }
  );
};

export const validateInputPassword = (formField: FormField): true | Field => {
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

export const validateInputUrl = (formField: FormField): true | Field => {
  const { id, val } = formField;
  return (
    validator.isURL(val) || {
      [id]: {
        message: "Please provide a valid url.",
      },
    }
  );
};

export const validateInputString = (formField: FormField): true | Field => {
  const { id, val } = formField;

  return (
    (validator.isLength(val.trim(), { min: 1, max: 32 }) &&
      !validator.isEmpty(val.trim())) || {
      [id]: {
        message: "Input can't be empty, and must be less than 32 charaters.",
      },
    }
  );
};

export const validateInputIsNumber = (formField: FormField): true | Field => {
  const { id, val } = formField;
  return (
    validator.isNumeric(val) || {
      [id]: {
        message: "Please provide a number.",
      },
    }
  );
};
export const validateInputFlowNum = (formField: FormField): true | Field => {
  const validation = validateInputIsNumber(formField);
  if (validation == true) {
    const { id, val } = formField;
    if (+val > 1000000)
      return {
        [id]: { message: "Please provide a number less than 1 milion." },
      };
  }
  return validation;
};
export interface FormField {
  id: string;
  val: string;
}
