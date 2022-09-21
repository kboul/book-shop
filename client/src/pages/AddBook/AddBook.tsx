import { ChangeEvent, MouseEvent, useId, useState } from "react";

import { firstLetterUppercase } from "../../utils";
import { getType, isPrice } from "./utils";
import { initialState, inputNames } from "./constants";
import classname from "./styles";

interface BookForm {
  [key: string]: any;
}

export default function AddBook() {
  const [book, setBook] = useState<BookForm>(initialState);
  const [priceInvalid, setPriceInvalid] = useState(false);

  const id = useId();

  const handleInputChange =
    (inputName: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setPriceInvalid(
        isPrice(inputName) && Number(e.target.value) < 0 ? true : false
      );
      setBook((prevState) => ({ ...prevState, [inputName]: e.target.value }));
    };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={classname.container}>
        <div className={classname.addNewBookContainer}>
          <div className={classname.addNewBookHeader}>Add new book</div>
          {inputNames.map((inputName) => (
            <div className="flex flex-col mb-5" key={`${inputName}-${id}`}>
              <label htmlFor={inputName} className={classname.label}>
                {firstLetterUppercase(inputName)}
              </label>
              <div className="relative">
                <input
                  className={classname.input}
                  onChange={handleInputChange(inputName)}
                  min={0}
                  name={inputName}
                  placeholder={`Enter a ${inputName}`}
                  type={getType(inputName)}
                  value={book[inputName as keyof BookForm]}
                />
              </div>
            </div>
          ))}
          <button
            className={classname.addNewBookBtn}
            disabled={priceInvalid}
            onClick={handleClick}>
            Add new book
          </button>
        </div>
      </div>
    </>
  );
}
