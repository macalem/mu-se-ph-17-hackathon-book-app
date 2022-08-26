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
    return res.status(404).json();
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // validate body params
  if (!name || !email || !password) {
    return res.status(400).send();
  }

  try {
    const newUser = await UserService.createUser({ name, email, password });

    return res.json(newUser);
  } catch (e) {
    return res.status(409).json(e);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validate body params
  if (!email || !password) {
    return res.status(400).send();
  }

  try {
    const result = await UserService.login({ email, password });

    return res.json(result);
  } catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }
});

export default router;
