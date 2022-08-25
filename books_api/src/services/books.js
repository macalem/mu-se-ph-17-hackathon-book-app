import booksData from "../../data/books.js";
import GenreService from "./genres.js";

// Fetch All Books
const getAllBooks = () => {
  const genres = GenreService.getAllGenres();

  const books = booksData.map((book) => {
    return {
      ...book,
      genre: genres.find((genre) => genre.id == book.genre_id).name,
    };
  });

  return books;
};

// Fetch specific book by its ID
const getBookByID = (id) => getAllBooks().find((book) => book.id === id);

// Fetch list of books by Genre name
const getBooksByGenre = (genreName) => {
  const genre = GenreService.getGenreByName(genreName);

  return getAllBooks().filter((book) => book.genre_id == genre.id);
};

export default { getAllBooks, getBookByID, getBooksByGenre };
