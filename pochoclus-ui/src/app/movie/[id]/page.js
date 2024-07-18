"use client";
import VideoEmbeed from "@/app/components/VideoEmbeed";
import SpecialFeaturesCard from "@/app/components/SpecialFeaturesCard";
import FilmotecaCard from "@/app/components/FilmotecaCard";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  getLocalStorageToken,
  setLocalStorageToken,
} from "../../../utils/utils";

export default function MovieDetail({ params }) {
  const router = useRouter();
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

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
    try {
      const token = getLocalStorageToken();
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      const url = new URL("http://localhost:3001/api/users/watchlist");
      url.searchParams.append("email", email);

      fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((watchlist) => {
          console.log(watchlist);
          const isMovieInWatchlist = watchlist.some((movie) => movie._id == id);
          setIsInWatchlist(isMovieInWatchlist);
          console.log(isMovieInWatchlist);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleAddToWatchlist = async () => {
    try {
      const token = getLocalStorageToken();
      if (token == null) {
        window.location.href = "/login";
      }
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;

      const response = await fetch(
        "http://localhost:3001/api/users/watchlist",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movieId: id, email }),
        }
      );

      if (response.ok) {
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const token = getLocalStorageToken();
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      const response = await fetch(
        "http://localhost:3001/api/users/watchlist",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movieId: id, email }),
        }
      );

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
    <div className="flex flex-col items-center p-4">
      <section className="flex flex-col lg:flex-row m-6 items-center gap-4">
        <h1 className="text-white font-bold text-3xl lg:text-5xl mb-2">
          {movie.name}
        </h1>
        <h2 className="text-gray-300 text-lg lg:text-xl">
          <span className="font-bold text-xl lg:text-2xl">
            {" "}
            ({movie.year}){" "}
          </span>
        </h2>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full m-6 gap-4">
        <section className="col-span-1 flex justify-center ">
          <img
            src={movie.poster}
            className="w-32 lg:w-64"
            alt={`${movie.name} poster`}
          />
        </section>
        <section className="col-span-2 text-white mt-4 lg:mt-0 lg:ml-4">
          <div className="mb-4">
            <span className="font-bold text-xl">Géneros:</span>
            <div className="flex flex-wrap">
              {movie.genres.map((g, index) => (
                <span className="font-light ml-2 text-medium" key={g}>
                  {g}
                </span>
              ))}
            </div>
          </div>
          <p className="font-light text-text-medium">
            <span className="font-bold text-xl">Sinopsis:</span> {movie.plot}
          </p>
          <div className="mt-4">
            <span className="font-bold text-xl">Actores:</span>
            <div className="flex flex-wrap">
              {movie.cast.map((c, index) => (
                <a
                  key={c.name}
                  href={`/person/${encodeURIComponent(c.name)}`}
                  className="text-blue-400 hover:underline transition duration-300 ease-in-out ml-2 text-medium"
                >
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
                <a
                  key={d.name}
                  href={`/person/${encodeURIComponent(d.name)}`}
                  className="text-blue-400 hover:underline transition duration-300 ease-in-out ml-2 text-medium"
                >
                  {d.name}
                  {index < movie.directors.length - 1 && ", "}
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={
                isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist
              }
              className={`text-white ${
                isInWatchlist
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-blue-700 hover:bg-blue-600"
              } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              {isInWatchlist ? "Eliminar de mi lista" : "Agregar a mi lista"}
            </button>
          </div>
        </section>
      </div>
      <div className="w-full mt-4">
        <div className="flex justify-center">
          <VideoEmbeed videoUrl={movie.link} />
        </div>
        {(movie.filmoteca || (movie.sp && movie.sp.length > 0)) && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-white font-bold text-xl mb-2">
              Special Features
            </p>
            <div className="flex flex-wrap justify-center">
              {movie.filmoteca && <FilmotecaCard filmoteca={movie.filmoteca} />}
              {movie.sp && movie.sp.length > 0 && (
                <div className="flex flex-wrap justify-center">
                  {movie.sp.map((sp) => (
                    <SpecialFeaturesCard
                      key={sp.spLink}
                      spTitulo={sp.spTitulo}
                      spLink={sp.spLink}
                    />
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
