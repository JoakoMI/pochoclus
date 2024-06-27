"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("   ");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (error) {
      setMsg("Credenciales no válidas");
    }
  }, [error]);

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
        localStorage.setItem("authToken", data.token);
        window.location.href = "/";
      } else {
        console.log("Token no recibido");
      }
    } catch (error) {
      setError(true);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="m-16">
      <h1 className="text-white text-center text-4xl font-bold mt-8">Iniciá sesión</h1>
      <form className="max-w-sm mx-auto m-8 " onSubmit={handleSubmit}>
        <div class="mb-5">
          <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">
            Tu email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tumail@pochoclus.com"
            required
            onChange={handleChange}
          />
        </div>
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
          <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <HiEyeOff className="text-gray-400" size={18} /> : <HiEye className="text-gray-400" size={18} />}
          </button>
        </div>

        <div>
          <br></br>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ingresar
          </button>
          <h1 className="text-red-600 text-center m-4">{msg}</h1>

          <div class="ms-2 m-8 text-sm text-center font-medium text-gray-200 dark:text-gray-300">
            Si todavia no tenes cuenta podes{" "}
            <Link href="/signup" class="text-blue-500 hover:underline dark:text-blue-500">
              registrarte acá
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
