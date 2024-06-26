"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { Navbar, NavbarContent, NavbarItem, Link, Input, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
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
    
    <Navbar isBordered>
      
      <NavbarContent justify="start">
        <p className="hidden sm:block font-bold text-inherit">Pochoclus</p>
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/explorar">
            Explorar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Buscar..."
            size="sm"
            type="search"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Menu as="div" className="relative">
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Mi cuenta
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {!isLoading && (
                <>
                  {session ? (
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`${active ? "bg-gray-900 text-white" : "text-gray-900"} group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={handleLogout}>
                          Salir
                        </button>
                      )}
                    </Menu.Item>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/login" className={`${active ? "bg-gray-900 text-white" : "text-gray-900"} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                            Ingresar
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/signup" className={`${active ? "bg-gray-900 text-white" : "text-gray-900"} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                            Registrarse
                          </Link>
                        )}
                      </Menu.Item>
                    </>
                  )}
                  {session && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/milista" className={`${active ? "bg-gray-900 text-white" : "text-gray-900"} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
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
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href="/milista">
            Mi lista
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href="/explorar">
            Explorar
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
