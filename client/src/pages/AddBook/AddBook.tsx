import { ChangeEvent, MouseEvent, useId, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { firstLetterUppercase } from "../../utils";
import { getType, isPrice } from "./utils";
import { addBook } from "../../api/books";
import { Book } from "../Books/models";
import { initialState, inputNames } from "./constants";
import classname from "./styles";

export default function AddBook() {
  const id = useId();
  const navigate = useNavigate();

  const [book, setBook] = useState(initialState);
  const [priceInvalid, setPriceInvalid] = useState(false);

  const addBookMutation = useMutation(addBook);

  const handleInputChange =
    (inputName: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setPriceInvalid(
        isPrice(inputName) && Number(e.target.value) < 0 ? true : false
      );
      setBook((prevState) => ({ ...prevState, [inputName]: e.target.value }));
    };

  const { title, description, price, cover } = book;

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!title || !description || !price || !cover)
      return alert("Please fill all inputs");

    addBookMutation.mutate(book);
    setBook(initialState);
    navigate("/");
  };

  return (
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
                min={0}
                name={inputName}
                onChange={handleInputChange(inputName)}
                placeholder={`Enter a ${inputName}`}
                type={getType(inputName)}
                value={book[inputName as keyof Book]}
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
  );
}
