import express from 'express';
import { signUpUser, logInUser } from '../data/users';
import { generateAuthToken } from '../data/authentication';
const router = express.Router();

router.post('/signUp', async (req, res) => {
	res.json(await signUpUser(req.body));
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await logInUser(email, password);

	const token = await generateAuthToken(user);
	res.json({ token });
});

export default router;
