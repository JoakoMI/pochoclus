import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Link,
} from "@nextui-org/react";

export default function MovieCard(props) {
  return (
    <div className="relative">
      <Link href={`/movie/${props._id}`}>
        <Card className="m-2 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-60 sm:h-72 md:h-80 lg:h-96 xl:h-104 bg-slate-100 hover:bg-slate-200 transition-opacity duration-300 opacity-90 hover:opacity-100 rounded-lg shadow-md overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            alt="poster de la pelicula"
            src={props.poster}
          />
          <CardHeader className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-1 flex flex-col items-start text-white">
            <h4 className="font-bold text-lg truncate hidden sm:block">
              {props.name}
            </h4>
            <small className="hidden sm:block font-normal">{props.year}</small>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
