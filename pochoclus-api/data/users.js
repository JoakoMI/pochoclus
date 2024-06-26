import { ObjectId } from 'mongodb';
import getConnection from './connection.js';
import bcryptjs from 'bcryptjs';

const DATABASE = 'Pochoclus';
const USERS = 'Users';
const MOVIES = 'Movies';

async function findByEmail(email) {
	const connectiondb = await getConnection();

	const user = await connectiondb.db(DATABASE).collection(USERS).findOne({ email: email });

	return user;
}

async function signUpUser(userInfo) {
	try {
		const connectiondb = await getConnection();

		const foundUser = await findByEmail(userInfo.email);
		if (foundUser?.email == userInfo.email) {
			throw new Error('Ya existe un usuario con ese mail');
		}

		if (userInfo.password != userInfo.repeatPassword) {
			throw new Error('Las contraseñas no coinciden');
		}

		userInfo.password = await bcryptjs.hash(userInfo.password, 10);

		const user = {
			name: userInfo.name,
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
	const passMatch = await bcryptjs.compare(password, foundUser.password);

	if (!passMatch) {
		throw new Error('Credenciales no validas');
	}

	return foundUser;
}

async function addMovieToWatchlist(movieId, email) {
	const connectiondb = await getConnection();

	let foundUser = await findByEmail(email);
	if (foundUser === null) {
		throw new Error('Usuario no válido');
	}
	let foundMovie = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.findOne({ _id: new ObjectId(movieId) });

	let movieInWatchlist = false;
	let i = 0;
	while (!movieInWatchlist && i < foundUser.watchlist.length) {
		if (foundUser.watchlist[i].tmdbId === foundMovie.tmdbId) {
			movieInWatchlist = true;
		}
		i++;
	}

	if (foundMovie === null) {
		throw new Error('Película no encontrada');
	} else if (movieInWatchlist) {
		throw new Error('Película ya está en la watchlist');
	}

	await connectiondb
		.db(DATABASE)
		.collection(USERS)
		.findOneAndUpdate({ email: email }, { $push: { watchlist: foundMovie } });
}

async function getAllMoviesFromWatchlist(email) {
	try {
		let foundUser = await findByEmail(email);
		if (foundUser === null) {
			throw new Error('Usuario no válido');
		}
		return foundUser.watchlist;
	} catch (error) {
		throw new Error(error.message);
	}
}

async function deleteMovieFromWatchlist(movieId, email) {
	const connectiondb = await getConnection();

	let foundUser = await findByEmail(email);
	if (foundUser === null) {
		throw new Error('Usuario no válido');
	}
	let foundMovie = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.findOne({ _id: new ObjectId(movieId) });

	if (foundMovie === null) {
		throw new Error('Película no encontrada');
	}

	await connectiondb
		.db(DATABASE)
		.collection(USERS)
		.findOneAndUpdate({ email: email }, { $pull: { watchlist: foundMovie } });

	return foundMovie;
}
export { signUpUser, logInUser, addMovieToWatchlist, getAllMoviesFromWatchlist, deleteMovieFromWatchlist };
