import getConnection from "./connection.js";
const DATABASE = "Pochoclus";
const MOVIES = "Movies";
const MOVIECOLLECTIONS = "MovieCollections";

async function createCollections() {
  // ----------------actors-----------------------
  const connectiondb = await getConnection();
  const gardelMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 1146483 }) // id Carlos Gardel
    .sort({ popularity: -1 })
    .toArray();

  const carlosBalaMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 1142805 }) // id Carlitos Balá
    .sort({ popularity: -1 })
    .toArray();

  const mirthaLegrandMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 1031299 }) // id Mirtha Legrand
    .sort({ popularity: -1 })
    .toArray();

  const sandroMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 1075387 }) // id Sandro
    .sort({ popularity: -1 })
    .toArray();

  const titaMerelloMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 1705887 }) // id Tita Merello
    .sort({ popularity: -1 })
    .toArray();

  const niniMarshallMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 1055667 }) // id NINÍ MARSHALL
    .sort({ popularity: -1 })
    .toArray();

  const luisAndriniMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "cast.tmdbId": 220227 }) // id LUIS SANDRINI
    .sort({ popularity: -1 })
    .toArray();

  // ----------------Directors-----------------------
  const directorIds = [
    116197, // TORRE NILSSON
    1087155, // SOFFICI
    1452584, // TORRE RIOS
    941154, // DEL CARRIL
    31336, // FREGONESE
    1083978, // DEMARE
    220264, // AYALA
    116190, // FAVIO
    109356, // ARISTARAIN
    71353, // SOLANAS
  ];

  const directoresMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      "directors.tmdbId": { $in: directorIds },
    })
    .sort({ popularity: -1 })
    .toArray();

  // ----------------Genres-----------------------

  const comedyMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ genres: "Comedia" }) // Comedia
    .sort({ popularity: -1 })
    .toArray();

  // ----------------Filmoteca-----------------------
  const filmotecaMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ filmoteca: { $ne: undefined } })
    .sort({ popularity: -1 })
    .toArray();

  // ----------------Top100-----------------------
  const top100Movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ top100: { $gte: 1 } })
    .sort({ top100: 1 })
    .toArray();

  // ----------------Gauchos-----------------------
  const moviesIds = [
    226934, // Amalia
    127172, // Pampa barbara
    300427, // La guerra gaucha
    198655, // Don segundo sombra
    202538, // Martin Fierro
    127467, // Juan Moreira
    435405, // Santos Vega Vuelve
    202460, // El santo de la espada
    202462, // Guemes la tierra
  ];

  const gauchosMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      tmdbId: { $in: moviesIds },
    })
    .sort({ popularity: -1 })
    .toArray();

  // ----------------Agregar todos los arrays-----------------------

  await connectiondb
    .db(DATABASE)
    .collection(MOVIECOLLECTIONS)
    .insertMany([
      { name: "Colección Gardel", movies: gardelMovies },
      { name: "Colección Carlos Balá", movies: carlosBalaMovies },
      { name: "Colección Mirtha Legrand", movies: mirthaLegrandMovies },
      { name: "Colección Sandro", movies: sandroMovies },
      { name: "Colección Tita Merello", movies: titaMerelloMovies },
      { name: "Colección Nini Marshall", movies: niniMarshallMovies },
      { name: "Colección luis Andrini", movies: luisAndriniMovies },
      { name: "Colección Directores", movies: directoresMovies },
      { name: "Colección Comedia", movies: comedyMovies },
      { name: "Colección Filmoteca", movies: filmotecaMovies },
      { name: "Colección Top100", movies: top100Movies },
      { name: "Colección TopGauchos", movies: gauchosMovies },
    ]);
}

async function getCollections() {
  const connectiondb = await getConnection();
  const collections = await connectiondb
    .db(DATABASE)
    .collection(MOVIECOLLECTIONS)
    .find({})
    .toArray();

  return collections;
}

export { createCollections, getCollections };
