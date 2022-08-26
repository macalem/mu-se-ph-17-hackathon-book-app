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
    const result = await AuthService.login({ email, password });

    return res.json(result);
  } catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }
});

export default router;
