import express from "express";
import AuthService from "../services/auth.js";

var router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // validate body params
  if (!email || !password) {
    return res.status(400).send();
  }

  try {
    const user = await AuthService.login({ email, password });

    return res.json(user);
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
});

export default router;
