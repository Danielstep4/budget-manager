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
      [id]: { message: "Please Provide An Email!" },
    }
  );
};
const validateInputPassword = (formField: FormField): true | Field => {
  const { id, val } = formField;
  // Stackoverflow
  /* eslint-disable */
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  /* eslint-enable */
  console.log(re.test(val));
  return (
    re.test(val) || {
      [id]: {
        message:
          "Please provide a valid password between 6-16 characters.\n Must contain least one special character !@#$%^&*. \n Must contain at least 1 numeric character. \n Must contain at least 1 uppercase character.",
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
