import getConnection from './connection.js';
import bcryptjs from 'bcryptjs';

const DATABASE = 'Pochoclus';
const USERS = 'Users';

async function findByEmail(email) {
	const connectiondb = await getConnection();

	const user = await connectiondb.db(DATABASE).collection(USERS).findOne({ email: email });

	return user;
}

async function signUpUser(userInfo) {
	try {
		const connectiondb = await getConnection();

		const foundUser = await findByEmail(user.email);
		if (foundUser !== null) {
			throw new Error('User already exists');
		}

		userInfo.password = await bcryptjs.hash(user.password, 10);

		const user = {
			email: userInfo.email,
			password: userInfo.password,
			watchlist: [],
			puntajes: [],
		};

		const result = connectiondb.db(DATABASE).collection(USERS).insertOne(user);

		return result;
	} catch (error) {
		throw new Error(error.message);
	}
}

async function logInUser(email, password) {
	const foundUser = await findByEmail(email);

	if (foundUser === null) {
		throw new Error('Credenciales no validas');
	}
	const hashedPass = await bcryptjs.hash(password, 10);
	const passMatch = await bcryptjs.compare(foundUser.password, hashedPass);

	if (!passMatch) {
		throw new Error('Credenciales no validas');
	}

	return user;
}

export { signUpUser, logInUser };
