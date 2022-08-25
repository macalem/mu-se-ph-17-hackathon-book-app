import express from "express";
import UserService from "../services/users.js"

var router = express.Router();

/* GET books listing. */
router.get("/", async (req, res) => {
  res.json(UserService.getAllUsers());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = UserService.getUserByID(id);

    return res.json(book);
  } catch(e) {
    return res.status(404).json();
  }
});

export default router;
