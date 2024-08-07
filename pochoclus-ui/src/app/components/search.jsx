"use client";
import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { SearchIcon } from "./SearchIcon";

export default function BasicDemo() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const search = async (event) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movies/byNameAndType?query=${event.query}`
      );
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]);
    }
  };

  const getLink = (item) => {
    switch (item.type) {
      case "Director":
        return `/person/${item.name}`;
      case "Actor":
        return `/person/${item.name}`;
      case "Actor y Director":
        return `/person/${item.name}`;
      case "Pelicula":
        return `/movie/${item.id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="card  flex justify-content-center ">
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={search}
        placeholder="Buscar..."
        onChange={(e) => setValue(e.value)}
        itemTemplate={(item) => (
          <a
            href={getLink(item)}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            <img src={item.poster} alt={item.name} className="w-10 h-10 mr-3" />
            <div>
              <span className="font-bold">{item.name}</span>
              <br />
              <span className="text-gray-500">{item.type}</span>
            </div>
          </a>
        )}
        panelClassName="w-full shadow-lg rounded-lg overflow-hidden border border-gray-300 bg-white"
      />
    </div>
  );
}
