"use client";

import PersonMovies from "@/app/components/PersonMovies";
import { useState, useEffect } from "react";

export default function ActorDetail({ params }) {
  const { name } = params;
  const [person, setActor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/person/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setActor(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setActor(null);
        setIsLoading(false);
      });

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/movies/moviesByPerson/${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, [name]);

  if (isLoading) return <p className="text-white">Loading...</p>;

  if (!person) return <p className="text-white">Movie not found</p>;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md mt-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <img
          src={person.image}
          alt={person.name}
          className="w-40 h-40 rounded-full mb-4"
        />
        <h1 className="text-white font-bold text-2xl mb-2 text-center">
          {person.name}
        </h1>
      </div>
      <div className="w-full mt-4">
        <PersonMovies movies={movies} />
      </div>
    </div>
  );
}
