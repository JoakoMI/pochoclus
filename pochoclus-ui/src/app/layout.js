import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pochoclus",
  description: "Archivo de peliculas argentinas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <nav>
          <NavBar />
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
