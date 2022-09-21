import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllBooks } from "../../api/books";
import { Book } from "./models";
import { truncate } from "../../utils";
import classname from "./styles";

export default function Books() {
  const { isLoading, error, data: books } = useQuery(["books"], getAllBooks);

  if (isLoading) return <>Loading..</>;
  if (error)
    return (
      <h3 className={classname.error}>
        An error has occured when trying to get the books list
      </h3>
    );
  return (
    <>
      <h1 className={classname.header}>Book Shop</h1>
      <div className={classname.container}>
        {books?.map((book: Book) => (
          <div className={classname.card} key={book.id}>
            {book.cover && (
              <img className={classname.img} src={book.cover} alt="cover" />
            )}
            <h2 className={classname.title}>{book.title}</h2>
            <p className={classname.description} title={book.description}>
              {truncate(book.description)}
            </p>
            <p className={classname.price}>{book.price} euro</p>
          </div>
        ))}
      </div>
      <button className={classname.addNewBookBtn}>
        <Link to="/add-book">Add a new book</Link>
      </button>
    </>
  );
}
