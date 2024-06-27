"use client";

import HomeCarousel from "./components/HomeCarousel";
import HorizList from "./components/HorizList";
import { useState, useEffect } from "react";

export default function Home() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/movieCollections")
      .then((response) => response.json())
      .then((data) => {
        setCollections(data);
      })
      .catch((error) => console.log(error));
  }, []);

  {
    console.log(collections);
  }
  return (
    <section>
      <HomeCarousel />
      {collections.map((c) => {
        if (c.title != "Carrusel") {
          return <HorizList collection={c} />;
        }
      })}
    </section>
  );
}
