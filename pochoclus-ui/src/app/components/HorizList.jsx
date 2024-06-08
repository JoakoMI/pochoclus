import MovieCard from "./MovieCard";

export default function HorizList(props) {
  return (
    <div className="py-4 px-4 my-1  ">
      <section className="my-1 items-baseline mb-4">
        <h1 className="text-white font-bold text-xl">{props.title}</h1>
        <p className="text-gray-300 text-base">{props.subTitle}</p>
      </section>

      <div className="inline-flex items-start gap-2">
        {props.Coleccion.map((pelicula) => {
          return (
            <MovieCard
              id={pelicula.id}
              title={peliculac.title}
              director={pelicula.director}
              year={pelicula.year}
              poster={pelicula.poster}
              cast={pelicula.cast}
              genres={pelicula.genres}
            />
          );
        })}
      </div>
    </div>
  );
}
