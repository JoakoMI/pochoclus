import MovieCard from "./MovieCard";

export default function PersonMovies(props) {
  return (
    <div className="py-4 px-4 my-1 mb-4 ">
      <section className="my-1 items-baseline mb-4">
        <h1 className="text-white font-bold text-xl">Peliculas</h1>
      </section>

      {/* {console.log("----------------------------")}
      {console.log(props)}
      {console.log("----------------------------")} */}

      <div className="inline-flex items-start gap-2">
        {props.movies.map((movie) => {
          return (
            <MovieCard
              _id={movie._id}
              name={movie.name}
              directors={movie.directors.name}
              year={movie.year}
              poster={movie.poster}
              cast={movie.cast}
              genres={movie.genres}
            />
          );
        })}
      </div>
    </div>
  );
}
