import MovieCard from "./MovieCard";
import peliculas from "../data/peliculasMock";

export default function HorizList() {
  const pelis = peliculas;

  return (
    <div className="py-4 px-4 my-1  ">
      <section className="my-1 ">
        <h1 className="text-white text-xl font-bold">Titulo de la lista</h1>
      </section>

      <div className="inline-flex items-start gap-2">
        {pelis.map((p) => {
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
