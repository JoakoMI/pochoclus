"use client";

import PersonMovies from "@/app/components/PersonMovies";
import { useState, useEffect } from "react";

export default function ActorDetail({ params }) {
  const { name } = params;
  const [director, setActor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/movies/person/${name}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActor(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setActor(null);
        setIsLoading(false);
      }
    };

    fetch(`http://localhost:3001/api/movies/moviesByPerson/${name}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--------------------");
        console.log(data);
        console.log("--------------------");
        setMovies(data);
      });

    fetchActor();
  }, [name]);

  useEffect(() => {
    director == null ? setIsLoading(true) : setIsLoading(false);
  }, [director]);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (!director) {
    return <p className="text-white">Director not found</p>;
  }

  const actorImage = director.image
    ? director.image
    : "/default-director-image.jpg"; // Ruta a la imagen predeterminada en la carpeta public

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={actorImage}
          alt={director.name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-white font-bold text-2xl mb-2">{director.name}</h1>
      </div>
      <PersonMovies movies={movies} />
    </div>
  );
}
