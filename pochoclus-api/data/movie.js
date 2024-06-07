import getConnection from './conn.js';
const DATABASE = 'Pochoclus';
const MOVIES = 'Movies';

async function getAllMovies(pageSize, page) {
	const connectiondb = await getConnection();
	const movies = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.find({})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return movies;
}

export { getAllMovies };
