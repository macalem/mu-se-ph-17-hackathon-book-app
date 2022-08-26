import express from "express";
import BookService from "../services/books.js"

const router = express.Router();

/* GET books listing. */
router.get("/", async (req, res) => {
  const { filter } = req.query;

  if (filter) {
    return res.json(BookService.getFilteredBooks(filter));
  }

  return res.json(BookService.getAllBooks());
  
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = BookService.getBookByID(id);

    return res.json(book);
  } catch(e) {
    return res.status(404).json();
  }
});

router.get("/:id", async (req, res) => {
  console.log("body",req)
  const { id } = req.params;

  try {
    const book = BookService.getBookByID(id);

    return res.json(book);
  } catch(e) {
    return res.status(404).json();
  }
});

router.post("/create", async (req, res) => {
  const {name,dewey_decimal, description,author,published_date, genre_id, premium, file} = req.body;

  try {
    const result =  BookService.createBooks({name,dewey_decimal, description,author,published_date, genre_id, premium, file})
    return res.json(result)
  } catch(err) {
    return res.status(err.statusCode).send(err);
  }
});

export default router;
