"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";


export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Credenciales no validas");
      }
      
      

      const data = await response.json();

      if (data != null) {
        console.log("Registro exitoso.");
        console.log("Token recibido:", data);
        localStorage.setItem("authToken", data);
        window.location.href = "/";        
      } else {
        console.log("Token no recibido");
      }
    } catch (error) {
      
    }
  };

  return (
    <form className="max-w-sm mx-auto m-16 " onSubmit={handleSubmit}>
      <div class="mb-5">
        <label
          htmlFor="email"
          class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Tu email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="petru@pochoclus.com"
          required
          onChange={handleChange}
        />
      </div>
      <div class="mb-5">
        <label
          htmlFor="password"
          class="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Tu contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={handleChange}
        />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>

        <label
          htmlFor="remember"
          class="ms-2 text-sm font-medium text-gray-200 dark:text-gray-300"
        >
          recordarme
        </label>
      </div>
      <div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ingresar
        </button>
        <div class="ms-2 m-8 text-sm text-center font-medium text-gray-200 dark:text-gray-300">
          Si todavia no tenes cuenta podes{" "}
          <Link
            href="/signup"
            class="text-blue-500 hover:underline dark:text-blue-500"
          >
            registrarte acá
          </Link>
        </div>
      </div>
    </form>
  );
}
