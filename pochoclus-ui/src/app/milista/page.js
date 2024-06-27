"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import MovieCard from "../components/MovieCard";

export default function MiLista() {
  const [movies, setMovies] = useState(null);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const email = decodedToken.email;

  useEffect(() => {
    const url = new URL("http://localhost:3001/api/users/watchlist");
    url.searchParams.append("email", email);

    fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <di>
      <h1 className="text-white text-center text-4xl font-bold mt-8">
        Tus peliculas
      </h1>
      <div className="m-16 grid grid-cols-4">
        {movies?.map((m) => (
          <div className="m-4" key={m._id}>
            <MovieCard
              _id={m._id}
              name={m.name}
              directors={m.directors.name}
              year={m.year}
              poster={m.poster}
              cast={m.cast}
              genres={m.genres}
            />
          </div>
        ))}
      </div>
    </di>
  );
}
