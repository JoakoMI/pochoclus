import express from 'express';
import { signUpUser, logInUser, addMovieToWatchlist } from '../data/users.js';
import { authenticateToken, generateAuthToken } from '../data/authentication.js';
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

router.patch(
	'/watchlist',
	async (req, res, next) => await authenticateToken(req, res, next),
	async (req, res) => {
		try {
			const { movieId, email } = req.body;

			await addMovieToWatchlist(movieId, email);
			res.status(201).send('');
		} catch (error) {
			res.status(400).send({ message: error.message });
		}
	}
);

export default router;
