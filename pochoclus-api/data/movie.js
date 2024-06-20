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

async function getByName(personName) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .toArray();

  // Normalizar Nombre
  const normalizedPersonName = personName.toLowerCase();

  for (const movie of movies) {
    // Buscar en directores
    if (movie.directors) {
      for (const director of movie.directors) {
        if (director.name.toLowerCase() === normalizedPersonName) {
          return { name: director.name, image: director.image };
        }
      }
    }

    // Buscar en Actores
    if (movie.cast) {
      for (const actor of movie.cast) {
        if (actor.name.toLowerCase() === normalizedPersonName) {
          return { name: actor.name, image: actor.image };
        }
      }
    }
  }

  return null;
}


async function getNamesAndTypes(query, pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .project({ _id: 1, name: 1, tmdbId: 1, cast: 1, directors: 1, poster: 1 })
    .toArray();

  const result = [];
  const peliculas = new Set();
  const persons = new Map();
  const lowerQuery = query.toLowerCase();

  movies.forEach((movie) => {
    // Añadir Películas
    if (
      !peliculas.has(movie.name) &&
      movie.name.toLowerCase().includes(lowerQuery)
    ) {
      result.push({
        id: movie._id,
        name: movie.name,
        type: "Pelicula",
        poster: movie.poster,
      });
      peliculas.add(movie.name);
    }

    // Añadir Actores
    if (movie.cast) {
      movie.cast.forEach((castMember) => {
        if (castMember.name.toLowerCase().includes(lowerQuery)) {
          const person = persons.get(castMember.name) || {
            name: castMember.name,
            type: "",
            poster: castMember.image,
          };
          if (!person.type.includes("Actor")) {
            person.type += (person.type ? " y " : "") + "Actor";
          }
          persons.set(castMember.name, person);
        }
      });
    }

    // Añadir Directores
    if (movie.directors) {
      movie.directors.forEach((director) => {
        if (director.name.toLowerCase().includes(lowerQuery)) {
          const person = persons.get(director.name) || {
            name: director.name,
            type: "",
            poster: director.image,
          };
          if (!person.type.includes("Director")) {
            person.type += (person.type ? " y " : "") + "Director";
          }
          persons.set(director.name, person);
        }
      });
    }
  });

  persons.forEach((person) => {
    result.push(person);
  });

  return result;
}

// solo Actor y Director
async function getMoviesPersonByName(personName) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      $or: [
        { "directors.name": personName },
        { "cast.name": personName }
      ]
    })
    .toArray();

  return movies;
}


export {
  getAllMovies,
  getMovieById,
  getNamesAndTypes,
  getMoviesPersonByName,
  getByName
};

