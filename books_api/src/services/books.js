import booksData from "../../data/books.js";
import GenreService from "./genres.js";

import BOOK_STATUSES from '../constants/status.js';

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
const getBookByID = (id) => getAllBooks().find((book) => book.id == id);

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
  isbn,
}) => {

  const newBook = {
    id: parseInt(booksData[booksData.length - 1].id) + 1,
    name: name,
    dewey_decimal: dewey_decimal,
    description: description,
    author: author,
    published_date: published_date,
    genre_id: genre_id,
    premium: premium,
    file: file,
    isbn: isbn,
  };

  // validate params
  if (!author || !name || !file || !isbn) {
    throw new Error("Missing required parameters");
  }

  // check if user exists.
  if (books.find((book) => book.isbn === isbn)) {
    console.log("here");
    throw new Error("Book already exists");
  }

  books.push(newBook);

  return newBook;
};

// Fetch list of books by filter
const getFilteredBooks = (filter) => {
  const genres = GenreService.getAllGenres();

  filter = filter.trim().toLowerCase()

  const books = getAllBooks().filter(
    (book) =>
      book.author.trim().toLowerCase().includes(filter) ||
      book.name.trim().toLowerCase().includes(filter) ||
      book.genre_id == genres.find((genre) => genre.name.trim().toLowerCase().includes(filter))
  );

  return books;
};

// Update status of a book
const updateBookStatus = ({id, status}) => {
  if (!BOOK_STATUSES.includes(status)) throw new Error("wrong status");

  if (!getBookByID(id)) throw new Error("Book doesn't exist.");

  booksData[booksData.findIndex(book => book.id == id)].status = status;

  return true;
}

export default {
  getAllBooks,
  getBookByID,
  getBooksByGenre,
  createBooks,
  getFilteredBooks,
  updateBookStatus
};
