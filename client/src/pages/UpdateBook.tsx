import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { BookForm } from "../components";
import { Book } from "../models";
import { getBook, updateBook } from "../api/books";
import { initialBookState } from "../constants";

export default function UpdateBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data: selectedBook } = useQuery(["book", bookId], () =>
    getBook(Number(bookId))
  );

  useEffect(() => {
    if (selectedBook) setBook(selectedBook[0]);
  }, [selectedBook]);

  const [book, setBook] = useState<Book>(initialBookState);

  const updateBookMutation = useMutation(updateBook, {
    onSuccess: (data) => {
      navigate("/");
      toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    }
  });

  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!book?.title || !book?.description || !book?.price || !book?.cover)
      return alert("Please fill all inputs");

    updateBookMutation.mutate({ bookId: Number(bookId), book });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    setBook((prevState) => ({ ...prevState, [inputName]: e.target.value }));
  };

  return (
    <BookForm
      book={book}
      onButtonClick={handleButtonClick}
      onInputChange={handleInputChange}
      use="update"
    />
  );
}
