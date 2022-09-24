import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

import { deleteBook, getAllBooks } from "../../api/books";
import { Book } from "../../models";
import { truncate } from "../../utils";
import className from "./styles";

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
      <h3 className={className.error}>
        An error has occured when trying to get the books list
      </h3>
    );

  const handleBookDelete = (bookId: number) => () =>
    deleteBookMutation.mutate(bookId);

  const handleBookUpdate = (bookId: number) => () =>
    navigate(`/update-book/${bookId}`);

  return (
    <>
      <h1 className={className.header}>Book Shop</h1>
      <div className={className.container}>
        {books?.map((book: Book) => (
          <div className={className.card} key={book.id}>
            {book.cover && (
              <img className={className.img} src={book.cover} alt="cover" />
            )}
            <h2 className={className.title}>{book.title}</h2>
            <p className={className.description} title={book.description}>
              {truncate(book.description)}
            </p>
            <p className={className.price}>{book.price} euro</p>
            <TrashIcon
              className={className.deleteBtn}
              onClick={handleBookDelete(book.id)}
            />
            <PencilIcon
              className={className.editBtn}
              onClick={handleBookUpdate(book.id)}
            />
          </div>
        ))}
      </div>
      <button className={className.addNewBookBtn}>
        <Link to="/add-book">Add a new book</Link>
      </button>
    </>
  );
}
