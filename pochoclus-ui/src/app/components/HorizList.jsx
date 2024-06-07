import MovieCard from "./MovieCard";

export default function HorizList(props) {
  const collecion = props;

  return (
    <div className="py-4 px-4 my-1  ">
      <section className="my-1 items-baseline mb-4">
        <h1 className="text-white font-bold text-xl">
          Las 100 mejores películas argentinas de la historia
        </h1>
        <p className="text-gray-300 text-base">
          Álgunas de las mejores películas argentinas de la historia, segun la
          célebre encuesta Top 100 que se realizó en 2022
        </p>
      </section>

      <div className="inline-flex items-start gap-2">
        {collecion.map((p) => {
          return (
            <MovieCard
              id={p.id}
              title={p.title}
              director={p.director}
              year={p.year}
              poster={p.poster}
              cast={p.cast}
              genres={p.genres}
            />
          );
        })}
      </div>
    </div>
  );
}
