import jwt from 'jsonwebtoken';
import { authenticateToken } from '../data/authentication';

async function auth(req, res, next) {
	try {
		const token = req.header('Authentication');
		const permit = await authenticateToken(token);
		if (!permit) {
			throw new Error('User not allowed in this page');
		}
		next();
	} catch (error) {
		res.status(401).send(error.message);
	}
}

export default auth;
