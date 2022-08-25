import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
const { PORT = 5010 } = process.env;

import usersRouter from "./routes/users.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);

app.get("*", function (req, res) {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

export default app;
