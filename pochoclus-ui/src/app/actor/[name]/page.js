"use client";
import { useState, useEffect } from "react";

export default function ActorDetail({ params }) {
  const { name } = params;
  const [actor, setActor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/movies/actor/${name}`
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

    fetchActor();
  }, [name]);

  useEffect(() => {
    actor == null ? setIsLoading(true) : setIsLoading(false);
  }, [actor]);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (!actor) {
    return <p className="text-white">Actor not found</p>;
  }

  const actorImage = actor.image ? actor.image : "/default-actor-image.jpg"; // Ruta a la imagen predeterminada en la carpeta public

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={actorImage}
          alt={actor.name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-white font-bold text-2xl mb-2">{actor.name}</h1>
      </div>
    </div>
  );
}
