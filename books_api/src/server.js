import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
const { PORT = 5000 } = process.env;

import booksRouter from "./routes/books.js";
import genresRouter from "./routes/genres.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/books/genres", genresRouter);
app.use("/books", booksRouter);

app.get("*", function (req, res) {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

export default app;
