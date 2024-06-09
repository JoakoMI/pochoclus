import { ObjectId } from "mongodb";
import getConnection from "./connection.js";
const DATABASE = "Pochoclus";
const MOVIES = "Movies";

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

async function getMovieById(movieId) {
  try {
    const connectiondb = await getConnection();
    const movie = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .findOne({ _id: new ObjectId(movieId) });

    return movie;
  } catch (error) {
    return null;
  }
}

async function getMoviesByName(movieName) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ name: movieName })
    .project({ _id: 0, name: 1, "cast.name": 1, "directors.name": 1 })
    .toArray();

  return movies;
}

async function getNamesAndTypes(query, pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .project({ _id: 1, name: 1, tmdbId: 1, cast: 1, directors: 1 })
    .toArray();

  const result = [];
  const seen = new Set();
  const lowerQuery = query.toLowerCase();

  movies.forEach((movie) => {
    // Añadir Películas
    if (!seen.has(movie.name) && movie.name.toLowerCase().includes(lowerQuery)) {
      result.push({ name: movie.name, type: "Pelicula" });
      seen.add(movie.name);
    }

    // Añadir Actores
    if (movie.cast) {
      movie.cast.forEach((castMember) => {
        if (!seen.has(castMember.name) && castMember.name.toLowerCase().includes(lowerQuery)) {
          result.push({ name: castMember.name, type: "Actor" });
          seen.add(castMember.name);
        }
      });
    }

    // Añadir Directores
    if (movie.directors) {
      movie.directors.forEach((director) => {
        if (!seen.has(director.name) && director.name.toLowerCase().includes(lowerQuery)) {
          result.push({ name: director.name, type: "Director" });
          seen.add(director.name);
        }
      });
    }
  });

  return result;
}
export { getAllMovies, getMovieById, getMoviesByName, getNamesAndTypes };
