import { ChangeEvent, MouseEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { BookForm } from "../components";
import { addBook } from "../api/books";
// import { isPrice } from "../../utils";

const initialState = {
  id: new Date().getTime(),
  title: "",
  description: "",
  cover: "",
  price: ""
};

export default function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState(initialState);
  // const [priceInvalid, setPriceInvalid] = useState(false);

  const addBookMutation = useMutation(addBook);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    // setPriceInvalid(
    //   isPrice(inputName) && Number(e.target.value) < 0 ? true : false
    // );
    setBook((prevState) => ({ ...prevState, [inputName]: e.target.value }));
  };

  const { title, description, price, cover } = book;

  const handleButtonClick = async (
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
    <BookForm
      book={book}
      onButtonClick={handleButtonClick}
      onInputChange={handleInputChange}
      purpose="add"
      // priceInvalid={priceInvalid}
    />
  );
}
