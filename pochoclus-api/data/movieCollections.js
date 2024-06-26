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

  // ----------------Inicio-----------------------

  const inicioMovies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ imgInicio: { $exists: true } })
    .sort({ popularity: -1 })
    .toArray();
    console.log(inicioMovies)
  

  // ----------------Agregar todos los arrays-----------------------

  await connectiondb
    .db(DATABASE)
    .collection(MOVIECOLLECTIONS)
    .insertMany([
      { title: "¿Qué gusto tiene la sal? Cine!", subtitle: "Grandes pelis de uno de los nuestros, el inigualable Carlitos Balá.", movies: carlosBalaMovies },
      { title: "El morocho del abasto: Carlos Gardel", subtitle: "Volver a ver estos clásicos de Carlos Gardel? Intentemos no perder la cabeza. El uno definitivo.", movies: gardelMovies },
      { title: "Las 100 mejores películas argentinas de la historia", subtitle: "Algunas de las mejores películas argentinas de la historia, segun la célebre encuesta Top 100 que se realizó en 2022", movies: top100Movies },
      { title: "Grandes películas de Mirtha Legrand", subtitle: "La Chiqui tiene uno de los catalogos cinematográficos más completos del cine nacional. Reviví sus films!", movies: mirthaLegrandMovies },
      { title: "¡Filmoteca presenta!", subtitle: 'Algunas de las mejores películas argentinas proyectadas en "Filmoteca, temas de cine" el celebre programa de la TV Pública', movies: filmotecaMovies },
      { title: "Damas y caballeros, con ustedes: Sandro de América", subtitle: "Las películas del gitano, disponibles para que disfrutes TODO lo que ofrecía el carisma y estilo del querido Sandro.", movies: sandroMovies },
      { title: "¿Qué se dice de Tita Merello?", subtitle: "Una de las primeras estrellas totales, aprovechá y disfrutá del tango y la milonga junto a Tita y su cine.", movies: titaMerelloMovies },
      { title: "Graciosos argentinos", subtitle: "Si tenés ganas de reirte, no suele haber muchas mejores opciones que ver grandes comedias del cine argentino.", movies: comedyMovies },
      { title: "La Chaplin con faldas: Niní Marshall", subtitle: '"Digo de mí que no soy artista, sino una señora de su casa que logró, simplemente, hacerse la graciosa"', movies: niniMarshallMovies },
      { title: "Grandes películas de grandes directores", subtitle: "Soffici, Christensen, Torre Nilsson, Favio... La lista es infinita. Algunas de las mejores películas dirigidas por los mejores directores de nuestro país.", movies: directoresMovies },
      { title: "Grandes películas de Gauchos", subtitle: "¿Qué hay más argentino que historias de gauchos? Acá hay una selección de las mejores películas donde los gauchos son más que un estereotipo.", movies: gauchosMovies },
      { title: "¡La vieja ve los colores! Grandes hits de Luis Sandrini", subtitle: "Algunas de las mejores comedias de Sandrini, el tipo con la carrera cómica más grande de nuestro país.", movies: luisAndriniMovies },
      {title: "Carrusel", subtitle: "Carrusel", movies: inicioMovies}
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

async function getCollectionByTitle(carrusel) {
  const connectiondb = await getConnection();
  const collections = await connectiondb
    .db(DATABASE)
    .collection(MOVIECOLLECTIONS)
    .find({title : carrusel})
    .toArray();

  return collections;
}


export { createCollections, getCollections , getCollectionByTitle};
