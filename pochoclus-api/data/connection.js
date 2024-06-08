import 'dotenv/config';
import { MongoClient } from 'mongodb';
import movieJSON from '../movie.json' assert { type: 'json' };

const uri = process.env.CONNECTION_STRING;
const api_key = process.env.BEARER;
const db = 'Pochoclus';
const collection = 'Movies';

const client = new MongoClient(uri);

let instance = null;

export default async function getConnection() {
	try {
		if (instance == null) {
			instance = await client.connect();
		}
		if ((await instance.db(db).collection(collection).findOne()) === null) {
			const options = {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${api_key}`,
				},
			};
			let bulkOp = instance.db(db).collection(collection).initializeUnorderedBulkOp();
			for (const movie of movieJSON) {
				let movieObj = {};
				await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie.movie}&include_adult=false&language=es-ES&page=1&year=${movie.year}`, options)
					.then(res => res.json())
					.then(data => data.results[0])
					.then(data => {
						movieObj = {
							name: movie.movie,
							tmdbId: data.id,
							popularity: data.popularity,
							top100: movie.top100,
							filmoteca: movie.intro,
							year: movie.year,
							link: movie.link,
							poster: data.poster_path ? 'https://image.tmdb.org/t/p/w342' + data.poster_path : null,
							plot: data.overview,
						};
					})
					.catch(err => console.error(err));

				await fetch(`https://api.themoviedb.org/3/movie/${movieObj.tmdbId}?language=es-ES&append_to_response=credits`, options)
					.then(res => res.json())
					.then(data => {
						let movieCast = [];
						let movieDirectors = [];
						movieObj.genres = data.genres.map(genre => genre.name);
						data.credits.cast.forEach(castMember => {
							if (castMember.known_for_department == 'Acting') {
								movieCast.push({
									tmdbId: castMember.id,
									name: castMember.name,
									image: castMember.profile_path ? 'https://image.tmdb.org/t/p/w342' + castMember.profile_path : null,
								});
							}
						});
						movieObj.cast = movieCast;
						data.credits.crew.forEach(crewMember => {
							if (crewMember.department == 'Directing' && crewMember.job == 'Director') {
								movieDirectors.push({
									tmdbId: crewMember.id,
									name: crewMember.name,
									image: crewMember.profile_path ? 'https://image.tmdb.org/t/p/w342' + crewMember.profile_path : null,
								});
							}
						});
						movieObj.directors = movieDirectors;
					})
					.catch(err => console.error(err));

				bulkOp.insert(movieObj);
			}
			await bulkOp.execute();
			console.log('Data inserted.');
		}
	} catch (error) {
		console.error(error.message);
	}
	return instance;
}
