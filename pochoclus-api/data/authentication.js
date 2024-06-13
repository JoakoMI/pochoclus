import 'dotenv/config';
import jwt from 'jsonwebtoken';

async function generateAuthToken(user) {
	const token = await jwt.sign({ name: user.name, email: user.email, profilePicture: user.profilePicture }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});
	return token;
}

async function authenticateToken(req, res, next) {
	try {
		const token = req.header('Authentication');
		await jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		res.status(401).send(error.message);
	}
}

export { generateAuthToken, authenticateToken };
