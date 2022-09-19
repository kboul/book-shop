import client from "./client";

const getAllBooks = async () => client.get("/api/books");

export { getAllBooks };
