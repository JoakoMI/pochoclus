import MovieCard from "./MovieCard";
import peliculas from "../../../data/peliculasMock";

export default function HorizList() {
  const pelis = peliculas;

  return (
    <div className="py-4 px-4 my-1  ">
      <section className="my-1 ">
        <h1 className="text-white text-xl font-bold">Titulo de la lista</h1>
      </section>

      <div className="inline-flex gap-2">
        {pelis.map((p) => {
          return (
            <MovieCard
              key={p.id}
              titulo={p.titulo}
              director={p.director}
              año={p.año}
              imagen={p.imagen}
            />
          );
        })}
      </div>
    </div>
  );
}
