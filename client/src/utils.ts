import { inputNames } from "./constants";

const truncate = (text: string): string => {
  return `${text.substring(0, 110)}...`;
};

const firstLetterUppercase = (text: string): string => {
  const splitText = text.split("");
  return `${splitText[0].toUpperCase()}${splitText
    .join("")
    .substring(1, splitText.length)}`;
};

const getType = (inputName: string): string => {
  return isPrice(inputName) ? "number" : "text";
};

const isPrice = (inputName: string): boolean => {
  return inputName === inputNames[inputNames.length - 1];
};

export { firstLetterUppercase, getType, isPrice, truncate };
