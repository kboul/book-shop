import express, { Application, Request, Response } from "express";
import mysql from "mysql2";

const app: Application = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_shop",
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.get("/books", (req: Request, res: Response) => {
  const query = "SELECT * FROM books";
  db.query(query, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.listen(5000, () => console.log(`Server running on port 5000`));
