import express, { Application, Request, Response } from "express";
import { createConnection } from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const db = createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// it allows us to send any json file using client
app.use(express.json());
// allow backend server to allow an app to use its api
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

const rootEndpoint = "/api/books";

app.get(rootEndpoint, (req: Request, res: Response) => {
  const query = "SELECT * FROM books";

  db.query(query, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.get(`${rootEndpoint}/:id`, (req: Request, res: Response) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";

  db.query(query, [bookId], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.post(rootEndpoint, (req: Request, res: Response) => {
  const query =
    "INSERT INTO books (`title`, `description`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price
  ];

  db.query(query, [values], (error, data) => {
    if (error) return res.json(error);
    return res.json("Book has been added successfully.");
  });
});

app.put(`${rootEndpoint}/:id`, (req: Request, res: Response) => {
  const bookId = req.params.id;
  const query =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price
  ];

  db.query(query, [...values, bookId], (error) => {
    if (error) return res.json(error);
    return res.json("Book has been updated successfully.");
  });
});

app.delete(`${rootEndpoint}/:id`, (req: Request, res: Response) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (error) => {
    if (error) return res.json(error);
    return res.json("Book has been deleted successfully.");
  });
});

app.listen(5000, () => console.log(`Server running on port 5000`));
