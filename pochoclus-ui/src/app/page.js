"use client";

import HomeCarousel from "./components/HomeCarousel";
import HorizList from "./components/HorizList";
import { useState, useEffect } from "react";

export default function Home() {
  const [collecciones, setCollecciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/movies?pageSize=20&page=1")
      .then((res) => res.json())
      .then((data) => setColecciones(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <HomeCarousel />
      {collecciones.map((c) => {
        return <HorizList colleccion={c} />;
      })}
    </section>
  );
}
