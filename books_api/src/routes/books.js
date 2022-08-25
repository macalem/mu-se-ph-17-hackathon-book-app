import express from "express";
import BookService from "../services/books.js"

var router = express.Router();

/* GET books listing. */
router.get("/", async (req, res) => {
  const { genre } = req.query;

  if (genre) {
    return res.json(BookService.getBooksByGenre(genre));
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
  const { id } = req.params;

  try {
    const book = BookService.getBookByID(id);

    return res.json(book);
  } catch(e) {
    return res.status(404).json();
  }
});

export default router;
