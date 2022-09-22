import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

import { deleteBook, getAllBooks } from "../../api/books";
import { Book } from "../../models";
import { truncate } from "../../utils";
import classname from "./styles";

export default function Books() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: books
  } = useQuery(["books"], getAllBooks, {
    refetchOnMount: true
  });

  const navigate = useNavigate();

  const deleteBookMutation = useMutation(deleteBook, {
    onSuccess: () => {
      // invalidates the cache and triggers a refetch
      queryClient.invalidateQueries(["books"]);
    }
  });

  if (isLoading) return <>Loading..</>;
  if (error)
    return (
      <h3 className={classname.error}>
        An error has occured when trying to get the books list
      </h3>
    );

  const handleBookDelete = (bookId: number) => () =>
    deleteBookMutation.mutate(bookId);

  const handleBookUpdate = (bookId: number) => () =>
    navigate(`/update-book/${bookId}`);

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
            <TrashIcon
              className={classname.deleteBtn}
              onClick={handleBookDelete(book.id)}
            />
            <PencilIcon
              className={classname.editBtn}
              onClick={handleBookUpdate(book.id)}
            />
          </div>
        ))}
      </div>
      <button className={classname.addNewBookBtn}>
        <Link to="/add-book">Add a new book</Link>
      </button>
    </>
  );
}
