import 'dotenv/config';
import jwt from 'jsonwebtoken';

async function generateAuthToken(user) {
	const token = await jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
	return token;
}

async function authenticateToken(token) {
	try {
		return await jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		throw new Error(error.message);
	}
}

export { generateAuthToken, authenticateToken };
