import { ChangeEvent, MouseEvent, useId } from "react";
import { inputNames } from "../constants";

import { Book } from "../models";
import { firstLetterUppercase, getType } from "../utils";

const classname = {
  container: "min-h-screen flex flex-col items-center justify-center",
  addNewBookContainer:
    "flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl xl:w-6/12 xl:max-w-md",
  header: "font-medium self-center text-xl sm:text-3xl text-gray-800 my-5",
  label: "mb-1 text-xs tracking-wide text-gray-600",
  input:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400",
  button:
    "flex w-full justify-center my-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 border rounded-2xl text-center"
};

export default function BookForm({
  book,
  onButtonClick,
  onInputChange,
  purpose
}: //   priceInvalid
{
  book: Book;
  onButtonClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  purpose: string;
  //   priceInvalid: boolean;
}) {
  const id = useId();

  const header = `${purpose === "add" ? "Add new" : "Update existing"} book`;

  return (
    <div className={classname.container}>
      <div className={classname.addNewBookContainer}>
        <div className={classname.header}>{header}</div>
        {inputNames.map((inputName) => (
          <div className="flex flex-col mb-5" key={`${inputName}-${id}`}>
            <label htmlFor={inputName} className={classname.label}>
              {firstLetterUppercase(inputName)}
            </label>
            <div className="relative">
              <input
                className={classname.input}
                min={0}
                name={inputName}
                onChange={(e) => onInputChange(e, inputName)}
                placeholder={`Enter a ${inputName}`}
                type={getType(inputName)}
                value={book[inputName as keyof Book]}
              />
            </div>
          </div>
        ))}
        <button
          className={classname.button}
          // disabled={priceInvalid}
          onClick={onButtonClick}>
          {header}
        </button>
      </div>
    </div>
  );
}
