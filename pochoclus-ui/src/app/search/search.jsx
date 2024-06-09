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
        itemTemplate={(item) => (
          <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V4a4 4 0 014-4h4a4 4 0 014 4v3M4 8h16m-5 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8h14zm5 0v10a2 2 0 01-2 2h-7a2 2 0 01-2-2V8h14z"></path></svg>
            <span>{item}</span>
          </div>
        )}
        panelClassName="w-full shadow-lg rounded-lg overflow-hidden border border-gray-300 bg-white"
      />
    </div>
  );
}


