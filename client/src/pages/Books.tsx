import { useQuery } from "@tanstack/react-query";

import { getAllBooks } from "../api/books";

export default function Books() {
  const { isLoading, error, data } = useQuery(["books"], getAllBooks);

  console.log(data);
  return <div>Books</div>;
}
