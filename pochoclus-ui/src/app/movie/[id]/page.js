"use client";
import VideoEmbeed from "@/app/components/VideoEmbeed";
import SpecialFeaturesCard from "@/app/components/SpecialFeaturesCard";
import FilmotecaCard from "@/app/components/FilmotecaCard";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function MovieDetail({ params }) {
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/movies/${id}`);
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setMovie(null);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const checkWatchlist = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;

      try {
        const response = await fetch("http://localhost:3001/api/users/watchlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });
        const watchlist = await response.json();
        const isMovieInWatchlist = watchlist.some((watchlistMovie) => watchlistMovie._id === id);
        setIsInWatchlist(isMovieInWatchlist);
      } catch (error) {
        console.error("Error checking watchlist:", error);
      }
    };

    checkWatchlist();
  }, [id]);

  const handleAddToWatchlist = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      const response = await fetch("http://localhost:3001/api/users/watchlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: id, email }),
      });

      if (response.ok) {
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      const response = await fetch("http://localhost:3001/api/users/watchlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: id, email }),
      });

      if (response.ok) {
        setIsInWatchlist(false);
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (!movie) return <p className="text-white">Movie not found</p>;

  return (
    <div className="flex flex-col items-center bg-dark p-4">
      <button
        onClick={isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
        className={`text-white ${
          isInWatchlist ? "bg-red-700 hover:bg-red-600" : "bg-blue-700 hover:bg-blue-600"
        } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      >
        {isInWatchlist ? "Eliminar de mi lista" : "Agregar a mi lista"}
      </button>
      <div className="w-full lg:w-1/2 m-4">
        <div className="flex flex-col items-center">
          <h1 className="text-white font-bold text-4xl mb-2">{movie.name}</h1>
          <h2 className="text-gray-300 text-xl">
            <span className="font-bold text-xl">Año:</span> {movie.year}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center mt-4">
          <img src={movie.poster} className="w-full lg:w-64" alt={`${movie.name} poster`} />
          <div className="text-white mt-4 lg:mt-0 lg:ml-4">
            <div className="mb-4">
              <span className="font-bold text-xl">Géneros:</span>
              <div className="flex flex-wrap">
                {movie.genres.map((g, index) => (
                  <span className="font-light ml-2 text-lg" key={g}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-light text-lg">
              <span className="font-bold">Sinopsis:</span> {movie.plot}
            </p>
            <div className="mt-4">
              <span className="font-bold text-xl">Actores:</span>
              <div className="flex flex-wrap">
                {movie.cast.map((c, index) => (
                  <a key={c.name} href={`/person/${encodeURIComponent(c.name)}`} className="text-blue-400 hover:underline transition duration-300 ease-in-out ml-2 text-lg">
                    {c.name}
                    {index < movie.cast.length - 1 && ", "}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <span className="font-bold text-xl">Directores:</span>
              <div className="flex flex-wrap">
                {movie.directors.map((d, index) => (
                  <a key={d.name} href={`/person/${encodeURIComponent(d.name)}`} className="text-blue-400 hover:underline transition duration-300 ease-in-out ml-2 text-lg">
                    {d.name}
                    {index < movie.directors.length - 1 && ", "}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex justify-center">
          <VideoEmbeed videoUrl={movie.link} />
        </div>
        {(movie.filmoteca || (movie.sp && movie.sp.length > 0)) && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-white font-bold text-xl mb-2">Special Features</p>
            <div className="flex flex-wrap justify-center">
              {movie.filmoteca && <FilmotecaCard filmoteca={movie.filmoteca} />}
              {movie.sp && movie.sp.length > 0 && (
                <div className="flex flex-wrap justify-center">
                  {movie.sp.map((sp) => (
                    <SpecialFeaturesCard spTitulo={sp.spTitulo} spLink={sp.spLink} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
