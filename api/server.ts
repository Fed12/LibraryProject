import express from "express";
import cors from "cors";
import booksData from "./data/books.json"; // Ensure you have a data directory with books.json

const app = express();

app.use(cors());

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  return booksData[randomIndex];
}

app.get("/random-book", (req, res) => {
  res.json(getRandomBook());
});

app.get("/random-book-delayed", (req, res) => {
  setTimeout(() => {
    res.json(getRandomBook());
  }, 2000);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
