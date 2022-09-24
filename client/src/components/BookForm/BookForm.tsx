import { useId } from "react";

import { Book } from "../../models";
import BookFormProps from "./model";
import { firstLetterUppercase, getType, isPrice } from "../../utils";
import { getHeader, remainingCharacters } from "./utils";
import { inputNames } from "../../constants";
import { inputMax } from "./contants";
import className from "./styles";

export default function BookForm({
  book,
  onButtonClick,
  onInputChange,
  use
}: BookFormProps) {
  const id = useId();

  const header = getHeader(use);

  const invalidCover = book.cover.length > inputMax.cover;
  const invalidTitle = book.title.length > inputMax.title;
  const invalidDescription = book.description.length > inputMax.description;
  const invalidPrice = book.price < 0;

  const inputClassName = (inputName: string) =>
    `${className.input} ${
      (inputName === inputNames[0] && invalidCover) ||
      (inputName === inputNames[1] && invalidTitle) ||
      (inputName === inputNames[2] && invalidDescription)
        ? "border-red-400 focus:border-red-400"
        : "border-gray-400 focus:border-blue-400"
    }`;

  const isButtonDisabled =
    invalidPrice || invalidCover || invalidTitle || invalidDescription;

  const buttonClassName = `${className.button} ${
    isButtonDisabled ? "bg-slate-300" : "bg-blue-600 hover:bg-blue-700"
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
                className={inputClassName(inputName)}
                min={0}
                name={inputName}
                onChange={(e) => onInputChange(e, inputName)}
                placeholder={`Enter a ${inputName}`}
                type={getType(inputName)}
                value={book[inputName as keyof Book]}
              />
              {!isPrice(inputName) && (
                <span className={`${className.helperText}`}>
                  {remainingCharacters(inputName, book)}
                </span>
              )}
              {isPrice(inputName) && invalidPrice && (
                <span className={className.price}>
                  Price should not be lower than 0
                </span>
              )}
            </div>
          </div>
        ))}
        <button
          className={buttonClassName}
          disabled={isButtonDisabled}
          onClick={onButtonClick}>
          {header}
        </button>
      </div>
    </div>
  );
}
