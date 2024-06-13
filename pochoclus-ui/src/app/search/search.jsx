"use client"
import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";


export default function BasicDemo() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const search = (event) => {
    setItems([...Array(10).keys()].map((item) => event.query + "perro" + item));
  };

  return (
    <div className="card flex justify-content-center">
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
}



