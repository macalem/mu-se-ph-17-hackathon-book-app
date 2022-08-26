import booksData from "../../data/books.js";
import GenreService from "./genres.js";
import books from "../../data/books.js";

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

const createBooks = ({
  name,
  dewey_decimal,
  description,
  author,
  published_date,
  genre_id,
  premium,
  file,
}) => {
  const newBooks = {
    id: parseInt(books[books.length - 1].id) + 1,
    name: name,
    dewey_decimal: dewey_decimal,
    description: description,
    author: author,
    published_date: published_date,
    genre_id: genre_id,
    premium: premium,
    file: file,
  };

  books.push(newBooks);

  return books;
};



export default { getAllBooks, getBookByID, getBooksByGenre, createBooks };
