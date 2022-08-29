import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
const { PORT = 5010 } = process.env;
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import swaggerUI from "swagger-ui-express";
import fs from 'fs';


const swaggerJson = JSON.parse(
  fs.readFileSync('src/swagger.json')
);
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/login", authRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.get("*", function (req, res) {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

export default app;
