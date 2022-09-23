import { ChangeEvent, MouseEvent, useId } from "react";
import { inputNames } from "../constants";

import { Book } from "../models";
import { firstLetterUppercase, getType, isPrice } from "../utils";

const className = {
  container: "min-h-screen flex flex-col items-center justify-center",
  addNewBookContainer:
    "flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl xl:w-6/12 xl:max-w-md",
  header: "font-medium self-center text-xl sm:text-3xl text-gray-800 my-5",
  label: "mb-1 text-xs tracking-wide text-gray-600",
  input:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400",
  helperText: "mb-1 text-xs tracking-wide text-gray-600",
  button:
    "flex w-full justify-center my-2 text-white text-sm px-4 py-2 border rounded-2xl text-center"
};

interface BookFormProps {
  book: Book;
  onButtonClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  purpose: string;
}

export default function BookForm({
  book,
  onButtonClick,
  onInputChange,
  purpose
}: BookFormProps) {
  const id = useId();

  const header = `${purpose === "add" ? "Add new" : "Update existing"} book`;

  const invalidPrice = book.price < 0;

  const buttonClassName = `${className.button} ${
    isPrice("price") && invalidPrice
      ? "bg-slate-300"
      : "bg-blue-600 hover:bg-blue-700"
  } `;

  return (
    <div className={className.container}>
      <div className={className.addNewBookContainer}>
        <div className={className.header}>{header}</div>
        {inputNames.map((inputName) => (
          <div className="flex flex-col mb-5" key={`${inputName}-${id}`}>
            <label htmlFor={inputName} className={className.label}>
              {firstLetterUppercase(inputName)}
            </label>
            <div className="relative">
              <input
                className={className.input}
                min={0}
                name={inputName}
                onChange={(e) => onInputChange(e, inputName)}
                placeholder={`Enter a ${inputName}`}
                type={getType(inputName)}
                value={book[inputName as keyof Book]}
              />
              {isPrice(inputName) && invalidPrice && (
                <span className={`${className.helperText} text-red-600`}>
                  Price should not be lower than 0
                </span>
              )}
            </div>
          </div>
        ))}
        <button
          className={buttonClassName}
          disabled={invalidPrice}
          onClick={onButtonClick}>
          {header}
        </button>
      </div>
    </div>
  );
}
