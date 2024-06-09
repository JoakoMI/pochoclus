import MovieCard from "./MovieCard";

export default function HorizList(props) {
  return (
    <div className="py-4 px-4 my-1 mb-4 ">
      <section className="my-1 items-baseline mb-4">
        <h1 className="text-white font-bold text-xl">
          {props.collection.title}
        </h1>
        <p className="text-gray-300 text-base">{props.collection.subtitle}</p>
      </section>

      <div className="inline-flex items-start gap-2">
        {props.collection.movies.map((movie) => {
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
