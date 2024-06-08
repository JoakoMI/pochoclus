"use client";

import { useState, useEffect } from "react";

export default function MovieDetail({ params }) {
  //const movie = peliculas.find((p) => p._id == props.params._id);
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        setMovie(null);
      });
  }, []);

  useEffect(() => {
    movie == null ? setIsLoading(true) : setIsLoading(false);
  }, [movie]);

  if (isLoading) return <p class="text-white">Loading...</p>;

  return (
    <div>
      <div class="flex justify-around m-4 ">
        <section class="w-1/2">
          <div class="flex ">
            <h1 className="text-white font-bold text-4xl mb-8 me-4">
              {movie.name}
            </h1>
            <h1 className="text-gray-200 font-light text-4xl   ">
              ({movie.year})
            </h1>
          </div>
          <p className="text-white font-light mb-4">{movie.plot} </p>
          <span class="flex justify-start mb-4 ">
            <div className="flex me-8 text-white">
              Dirige:
              {movie.directors.map((d) => {
                return <p className=" font-light  "> {d.name} </p>;
              })}
            </div>
            <div className="flex text-white">
              Generos:
              {movie.genres.map((g) => {
                return <p className=" font-light">{g}</p>;
              })}
            </div>
          </span>
          <section class="  text-white ">
            Actuan:
            {movie.cast.map((c) => {
              return <p className="font-light"> {c.name} </p>;
            })}
          </section>
        </section>
        <section>
          <img src={movie.poster} class="w-full"></img>
        </section>
      </div>
    </div>
  );
}
