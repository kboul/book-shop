import { inputNames } from "../../constants";
import { Book } from "../../models";
import { inputMax } from "./contants";

const getAllowedCharacters = (inputName: string): number => {
  return inputName === inputNames[0]
    ? inputMax.cover
    : inputName === inputNames[1]
    ? inputMax.title
    : inputMax.description;
};

const remainingCharacters = (inputName: string, book: Book): number => {
  const allowedCharacters = getAllowedCharacters(inputName);
  return (
    allowedCharacters - book[inputName as keyof Book].toLocaleString().length
  );
};

const getHeader = (use: string): string => {
  return `${use === "add" ? "Add new" : "Update existing"} book`;
};

export { getAllowedCharacters, getHeader, remainingCharacters };
