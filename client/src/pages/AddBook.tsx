import { ChangeEvent, MouseEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BookForm } from "../components";
import { addBook } from "../api/books";
import { initialBookState } from "../constants";

export default function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState(initialBookState);

  const addBookMutation = useMutation(addBook, {
    onSuccess: (data) => {
      setBook(initialBookState);
      navigate("/");
      toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    }
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    setBook((prevState) => ({ ...prevState, [inputName]: e.target.value }));
  };

  const { title, description, price, cover } = book;

  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!title || !description || !price || !cover)
      return alert("Please fill all inputs");

    addBookMutation.mutate(book);
  };

  return (
    <BookForm
      book={book}
      onButtonClick={handleButtonClick}
      onInputChange={handleInputChange}
      use="add"
    />
  );
}
