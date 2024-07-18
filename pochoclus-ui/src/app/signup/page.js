"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Signup() {
  const router = useRouter();
  const [errorValue, setErrorValue] = useState(false);
  const [msg, setMsg] = useState("   ");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (authToken) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null
    ) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (errorValue) {
      setMsg(
        "Hay un error en el formulario. Revise los campos y vuelva a intentar."
      );
    }
  }, [errorValue]);

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

      if (!response.ok) {
        throw new Error("Credenciales no validas");
      }

      if (response.ok) {
        console.log("Registro exitoso.");
        window.location.href = "/login";
      } else {
      }
    } catch (error) {
      setErrorValue(true);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1 className="text-white text-center text-4xl font-bold mt-8">
        Regístrate
      </h1>

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
            placeholder="tumail@pochoclus.com"
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
            placeholder="tuUsuario"
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tu contraseña"
              required
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiEyeOff className="text-gray-400" size={18} />
              ) : (
                <HiEye className="text-gray-400" size={18} />
              )}
            </button>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeatPassword"
            className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
          >
            Repetí tu contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="repeatPassword"
              name="repeatPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Repetí tu contraseña"
              required
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiEyeOff className="text-gray-400" size={18} />
              ) : (
                <HiEye className="text-gray-400" size={18} />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrarme
        </button>
        <h1 className="text-red-600 text-center m-4">{msg}</h1>
      </form>
    </div>
  );
}
