import client from "./client";
import { Book } from "../models";

const rootEndpoint = "/api/books";

const getAllBooks = async () => {
  const response = client.get(rootEndpoint);
  return (await response).data;
};

const getBook = async (bookId: number) => {
  const response = client.get(`${rootEndpoint}/${bookId}`);
  return (await response).data;
};

const addBook = async (book: Book) => {
  const response = client.post(rootEndpoint, book);
  return (await response).data;
};

const updateBook = async ({ bookId, book }: { bookId: number; book: Book }) => {
  const response = client.put(`${rootEndpoint}/${bookId}`, book);
  return (await response).data;
};

const deleteBook = async (bookId: number) => {
  const response = client.delete(`${rootEndpoint}/${bookId}`);
  return (await response).data;
};

export { getAllBooks, getBook, addBook, updateBook, deleteBook };
