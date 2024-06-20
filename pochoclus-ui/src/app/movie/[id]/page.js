"use client";
import VideoEmbeed from "@/app/components/VideoEmbeed";
import { useState, useEffect } from "react";

export default function MovieDetail({ params }) {
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setMovie(null);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p className="text-white">Loading...</p>;

  if (!movie) return <p className="text-white">Movie not found</p>;

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center">
      <div className="flex flex-col lg:w-1/2 m-4">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-4xl mb-2 lg:mb-0">
              {movie.name}
            </h1>
            <h1 className="text-gray-200 font-light text-4xl">
              ({movie.year})
            </h1>
          </div>
          <img
            src={movie.poster}
            className="w-full lg:w-64"
            alt={`${movie.name} poster`}
          />
        </div>
        <p className="text-white font-light mb-4">{movie.plot}</p>
        <div className="flex flex-wrap mb-4">
          <div className="flex flex-col me-8 text-white">
            <span className="font-bold">Dirige:</span>
            {movie.directors.map((d, index) => (
              <a
                key={d.name}
                href={`/person/${encodeURIComponent(d.name)}`}
                className="text-blue-400 hover:underline transition duration-300 ease-in-out mt-1"
              >
                {d.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col text-white mt-2 lg:mt-0">
            <span className="font-bold">Géneros:</span>
            {movie.genres.map((g, index) => (
              <span className="font-light ml-2" key={g}>
                {g}
              </span>
            ))}
          </div>
        </div>
        <section className="text-white">
          <span className="font-bold">Actúan:</span>
          {movie.cast.map((c, index) => (
            <a
              key={c.name}
              href={`/person/${encodeURIComponent(c.name)}`}
              className="text-blue-400 hover:underline transition duration-300 ease-in-out ml-2"
            >
              {c.name}
              {index < movie.cast.length - 1 && ", "}
            </a>
          ))}
        </section>
      </div>
      <div className="w-full">
        <VideoEmbeed videoUrl={movie.link} />
      </div>
    </div>
  );
}
