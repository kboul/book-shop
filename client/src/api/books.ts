import client from "./client";

const getAllBooks = async () => {
  const response = client.get("/api/books");
  return (await response).data;
};

export { getAllBooks };
