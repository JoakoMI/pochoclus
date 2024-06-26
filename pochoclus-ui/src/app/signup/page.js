"use client";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registro exitoso");
      } else {
        console.log("Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="max-w-sm mx-auto m-16" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Tu email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="petru@pochoclus.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Nombre de usuario
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Kingbara"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Tu contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="contraseña"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="repeatPassword"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Repetí tu contraseña
        </label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="contraseña"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Registrarme
      </button>
    </form>
  );
}
