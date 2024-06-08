"use client";

import HomeCarousel from "./components/HomeCarousel";
import HorizList from "./components/HorizList";
import { useState, useEffect } from "react";

export default function Home() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/movieCollections")
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <HomeCarousel />
      {collections.map((c) => {
        return <HorizList Collections={c} />;
      })}
    </section>
  );
}
