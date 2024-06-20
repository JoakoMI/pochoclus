import express from 'express';
import { signUpUser, logInUser } from '../data/users.js';
import { generateAuthToken } from '../data/authentication.js';
const router = express.Router();

router.post('/signUp', async (req, res) => {
	const token = await generateAuthToken(await signUpUser(req.body));
	res.json({ token });
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const token = await generateAuthToken(await logInUser(email, password));
	res.json({ token });
});

export default router;
