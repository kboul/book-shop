import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AddBook, Books, UpdateBook } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book" element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
  );
}
