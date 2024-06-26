"use client";
import React from "react";
import { useRouter } from "next/navigation.js";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { useEffect, useState } from "react";

export default function  App() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setSession(token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setSession(null);
    router.push("/");
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="center">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">Pochoclus</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/milista">
              Mi lista
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/explorar">
              Explorar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/colecciones">
              Colecciones
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Buscar..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        {session == null ? (
          <Link href="/login" placement="bottom-end">
            Ingresar
          </Link>
        ) : (
          <Link onClick={handleLogout} href="/" placement="bottom-end">
            Salir
          </Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
