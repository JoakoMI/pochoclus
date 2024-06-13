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
	'/watchlist/:movieId',
	async (req, res, next) => authenticateToken(req, res, next),
	async (req, res) => {
		const { movieId } = req.params;
		const { email } = req.body;

		addMovieToWatchlist(movieId, email);
		res.status(201).send('');
	}
);

export default router;
