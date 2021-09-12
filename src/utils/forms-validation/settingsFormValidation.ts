import { Field } from "../../context/ErrorContext";
import {
  validateInputEmail,
  validateInputIsNumber,
  validateInputString,
  validateInputUrl,
} from "./formValidatorsHelpers";

export const validateSettingsForm = (id: string, val: string): true | Field => {
  let correctFieldFlag: true | Field = true;
  const lowerCaseId = id.toLowerCase();
  if (lowerCaseId.includes("email"))
    correctFieldFlag = validateInputEmail({ id, val });
  if (lowerCaseId.includes("url"))
    correctFieldFlag = validateInputUrl({ id, val });
  if (lowerCaseId.includes("name"))
    correctFieldFlag = validateInputString({ id, val });
  if (lowerCaseId.includes("saving"))
    correctFieldFlag = validateInputIsNumber({ id, val });
  return correctFieldFlag;
};
