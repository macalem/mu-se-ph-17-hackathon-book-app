import genres from "../../data/genres.js";

const getAllGenres = () => genres;

const getGenreByID = (id) => genres.find((genre) => genre.id === id);

const getGenreByName = (name) =>
  genres.find(
    (genre) => genre.name.toLowerCase().trim() === name.toLowerCase().trim()
  );



export default { getAllGenres, getGenreByID, getGenreByName };
