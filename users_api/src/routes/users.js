import express from "express";
import UserService from "../services/users.js";

var router = express.Router();

/* GET books listing. */
router.get("/", async (req, res) => {
  res.json(UserService.getAllUsers());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = UserService.getUserByID(id);

    return res.json(user);
  } catch (e) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // validate body params
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Bad Request Data" });
  }

  try {
    const newUser = await UserService.createUser({ name, email, password });

    return res.status(201).json(newUser);
  } catch (e) {
    return res.status(409).json({ error: "User already exists" });
  }
});

export default router;
