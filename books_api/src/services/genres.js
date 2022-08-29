import genres from "../../data/genres.js";

const getAllGenres = () => genres;

const getGenreByID = (id) => {
  if (!id) throw new Error("Missing required parameter");

  return genres.find((genre) => genre.id === id);
};

const getGenreByName = (name) => {
  if (!name) throw new Error("Missing required parameter");

  return genres.find(
    (genre) => genre.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
};

export default { getAllGenres, getGenreByID, getGenreByName };
