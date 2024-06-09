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

async function getNamesAndTypes(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .project({ _id: 1, name: 1, tmdbId: 1 })

    .toArray();

  const result = [];
  const seen = new Set();

  movies.forEach(movie => {
    // Agregar nombre de pelicula
    if (!seen.has(movie.name)) {
      result.push({ name: movie.name, type: "Pelicula" });
      seen.add(movie.name);
    }

    // Agregar actores
    movie.cast.forEach(castMember => {
      if (!seen.has(castMember.name)) {
        result.push({ name: castMember.name, type: "Actor" });
        seen.add(castMember.name);
      }
    });

    // Agregar directores
    movie.directors.forEach(director => {
      if (!seen.has(director.name)) {
        result.push({ name: director.name, type: "Director" });
        seen.add(director.name);
      }
    });
    
  });

  return result;
}


export { getAllMovies, getMovieById, getMoviesByName, getNamesAndTypes };
