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

		const foundUser = await findByEmail(userInfo.email);
		if (foundUser !== null) {
			throw new Error('User already exists');
		}

		userInfo.password = await bcryptjs.hash(userInfo.password, 10);

		const user = {
			name: userInfo.name,
			email: userInfo.email,
			password: userInfo.password,
			profilePicture: userInfo.profilePicture ?? null,
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
	const passMatch = await bcryptjs.compare(password, foundUser.password);

	if (!passMatch) {
		throw new Error('Credenciales no validas');
	}

	return foundUser;
}

export { signUpUser, logInUser };
