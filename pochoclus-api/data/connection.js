import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import movieJSON from "../movie.json" assert { type: "json" };

const uri = process.env.CONNECTION_STRING;
const api_key = process.env.BEARER;

const client = new MongoClient(uri);

let instance = null;

export default async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      };
      let movies = [];
      for (const movie of movieJSON) {
        let movieObj = {};
        let movie_actors = [{}];
        let movie_directors = [{}];
        let actor = {};
        let director = {};
        await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movie.movie}&include_adult=false&language=es-ES&page=1&year=${movie.year}`,
          options
        )
          .then((res) => res.json())
          .then((data) => data.results[0])
          .then((data) => {
            console.log("PROCESANDO " + movie.movie);
            movieObj = {
              name: movie.movie,
              tmdb_id: data.id.toString(),
              year: movie.year,
              link: movie.link,
              poster: data.poster_path,
              plot: data.overview,
              actors: movie_actors,
              directors: movie_directors,
            };
          })
          .catch((err) => console.error(err));
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieObj.tmdb_id}?language=es-ES&append_to_response=credits`,
          options
        )
          .then((res) => res.json())
          .then((data) => {
            movieObj.genres = data.genres.map(genre => genre.name);
            data.credits.cast.forEach((cast_member) => {
              if (cast_member.known_for_department == "Acting") {
                actor = {
                  tmdb_id: cast_member.id,
                  name: cast_member.name,
                  image: cast_member.profile_path,
                };
                movieObj.actors.push(actor);
              }
            });
            data.credits.crew.forEach((crew_member) => {
              if (
                crew_member.department == "Directing" &&
                crew_member.job == "Director"
              ) {
                director = {
                  tmdb_id: crew_member.id,
                  name: crew_member.name,
                  image: crew_member.profile_path,
                };
                movieObj.directors.push(director);
              }
            });
          });
        movies.push(movieObj);
      };
      /*
      await instance.db("Pochoclus").collection("Movies").insertMany(movies); */

    } catch (error) {
      console.log(error.message);
    }
  }
  return instance;
}