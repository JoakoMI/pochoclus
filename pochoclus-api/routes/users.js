import express from "express";
import { signUpUser, logInUser } from "../data/users.js";
import { generateAuthToken } from "../data/authentication.js";
const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    const token = await generateAuthToken(await signUpUser(req.body));
    res.json({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await generateAuthToken(await logInUser(email, password));
    res.json({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
