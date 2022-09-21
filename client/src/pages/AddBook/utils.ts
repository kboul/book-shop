import { inputNames } from "./constants";

const getType = (inputName: string): string => {
  return isPrice(inputName) ? "number" : "text";
};

const isPrice = (inputName: string): boolean => {
  return inputName === inputNames[inputNames.length - 1];
};

export { getType, isPrice };
