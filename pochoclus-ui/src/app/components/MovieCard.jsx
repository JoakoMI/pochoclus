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
    <Link href={`/movie/${props.id}`} id={props.id}>
      <Card className="py-4 m-1 w-56 h-80  container">
        <CardBody className=" object-cover w-full h-full overflow-hidden py-0 ">
          <Image
            className="object-cover rounded-xl "
            alt="poster de la pelicula"
            src={props.poster}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col flex-grow">
          <section>
            <h4 className="font-bold text-large">{props.title}</h4>
            <p className="text-tiny uppercase font-bold">
              {props.director.name}
            </p>
            <small className="text-default-500">{props.year}</small>
          </section>
        </CardHeader>
      </Card>
    </Link>
  );
}
