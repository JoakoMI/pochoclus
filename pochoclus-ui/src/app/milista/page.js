"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import MovieCard from "../components/MovieCard";
import {
  getLocalStorageToken,
  setLocalStorageToken,
} from "../../../utils/utils";

export default function MiLista() {
  const [movies, setMovies] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = getLocalStorageToken();

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email);
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    } else {
      console.error("No token found");
    }
  }, []);

  useEffect(() => {
    if (email) {
      const fetchMovies = async () => {
        try {
          const url = new URL("http://localhost:3001/api/users/watchlist");
          url.searchParams.append("email", email);

          const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch movies");
          }

          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error("Error fetching movies:", error.message);
        }
      };

      fetchMovies();
    }
  }, [email]);

  return (
    <div>
      <h1 className="text-white text-center text-4xl font-bold mt-8">
        Tus películas
      </h1>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
}
