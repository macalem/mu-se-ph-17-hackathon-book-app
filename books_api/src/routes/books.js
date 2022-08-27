import express from "express";
import BookService from "../services/books.js";

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
  } catch (e) {
    return res.status(404).json({ error: "Book doesn't exist" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    dewey_decimal,
    isbn,
    description,
    author,
    published_date,
    genre_id,
    premium,
    file,
  } = req.body;

  // validate body params
  if (!author || !name || !file || !isbn) {
    return res.status(400).json({ error: "Bad Request Data" });
  }

  try {
    const result = BookService.createBooks({
      name,
      dewey_decimal,
      isbn,
      description,
      author,
      published_date,
      genre_id,
      premium,
      file,
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(409).json({ error: "Book already exists" });
  }
});

router.post("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Bad Request Data" });
  }

  try {
    const result = BookService.updateBookStatus({ id, status });

    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

export default router;
