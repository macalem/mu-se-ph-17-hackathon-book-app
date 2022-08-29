import booksData from "../../data/books.js";
import GenreService from "./genres.js";

import BOOK_STATUSES from "../constants/status.js";

// Fetch All Books
const getAllBooks = (filter, paging) => {
  const genres = GenreService.getAllGenres();

  let books = booksData.map((book) => {
    return {
      ...book,
      genre: genres.find((genre) => genre.id == book.genre_id).name,
    };
  });

  if (filter) {
    filter = filter.trim().toLowerCase();
    books = books.filter(
      (book) =>
        book.author.trim().toLowerCase().includes(filter) ||
        book.name.trim().toLowerCase().includes(filter) ||
        book.genre.trim().toLowerCase().includes(filter)
    );
  }

  if (paging?.limit) {
    const offset = paging.offset || 0;
    const limit = paging.limit || 9;
    books = books.splice(offset, limit)
  }

  return books;
};

const getBookByID = (id) => {
  if (!id) throw new Error("Missing required parameter");

  return getAllBooks().find((book) => book.id == id);
};

const createBook = ({
  name,
  dewey_decimal,
  description,
  author,
  published_date,
  genre_id,
  premium,
  file,
  isbn,
  status
}) => {
  // validate params
  if (!author || !name || !file || !isbn) {
    throw new Error("Missing required parameters");
  }

  // check if book exists.
  if (booksData.find((book) => book.isbn === isbn)) {
    throw new Error("Book already exists");
  }

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
    status: status,
  };

  booksData.push(newBook);

  return newBook;
};

// Update status of a book
const updateBookStatus = ({ id, status }) => {
  if (!id || !status) throw new Error("Missing required parameters");

  if (!BOOK_STATUSES.includes(status)) throw new Error("Incorrect Status");

  if (!getBookByID(id)) throw new Error("Book doesn't exist.");

  booksData[booksData.findIndex((book) => book.id == id)].status = status;

  return true;
};

export default {
  getAllBooks,
  getBookByID,
  createBook,
  updateBookStatus,
};
