import { Book } from "../pages/Books/models";
import client from "./client";

const rootEndpoint = "/api/books";

const getAllBooks = async () => {
  const response = client.get(rootEndpoint);
  return (await response).data;
};

const addBook = async (book: Book) => {
  const response = client.post(rootEndpoint, book);
  return (await response).data;
};

const updateBook = async (bookId: number) => {
  const response = client.put(`${rootEndpoint}/${bookId}`);
  return (await response).data;
};

const deleteBook = async (bookId: number) => {
  const response = client.delete(`${rootEndpoint}/${bookId}`);
  return (await response).data;
};

export { getAllBooks, addBook, updateBook, deleteBook };
