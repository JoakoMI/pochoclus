import peliculas from "@/app/data/peliculasMock";

export default function MovieDetail(props) {
  return (
    <h1 className="text-white text-center">
      Pagina de detalle de la pelicula {props.params.id}
    </h1>
  );
}
