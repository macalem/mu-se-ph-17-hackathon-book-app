import express from "express";
import GenreService from "../services/genre.js"

var router = express.Router();

/* GET books listing. */
router.get("/", async (req, res) => {
  res.json(GenreService.getAllGenres());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = GenreService.getGenreByID(id);

    return res.json(book);
  } catch(e) {
    return res.status(404).json();
  }
});

export default router;
