"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import Search from "./search.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setSession(token);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setSession(null);
    router.push("/");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <AcmeLogo />
            <p className="font-bold text-gray-800 ">Pochoclus</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarContent justify="end">
          <Search />
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end">
        <Menu as="div" className="relative">
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sky-950 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Mi cuenta
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {!isLoading && (
                <>
                  {session ? (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? " text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={handleLogout}
                        >
                          Salir
                        </button>
                      )}
                    </Menu.Item>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/login"
                            className={`${
                              active
                                ? "bg-gray-900 text-white"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Ingresar
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/signup"
                            className={`${
                              active
                                ? "bg-gray-900 text-white"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Registrarse
                          </Link>
                        )}
                      </Menu.Item>
                    </>
                  )}
                  {session && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/milista"
                          className={`${
                            active ? "bg-gray-900 text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Mi lista
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                </>
              )}
            </div>
          </Menu.Items>
        </Menu>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" href="/milista">
            Mi lista
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
