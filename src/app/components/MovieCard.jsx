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
    <Link href="/movieDetail" id={props.id}>
      <Card className="py-4 m-1 w-56">
        <CardBody className="overflow-visible py-0 ">
          <Image
            className="object-cover rounded-xl "
            alt="poster de la pelicula"
            src={props.imagen}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 inline-flex">
          <section>
            <h4 className="font-bold text-large">{props.titulo}</h4>
            <p className="text-tiny uppercase font-bold">{props.director}</p>
            <small className="text-default-500">{props.año}</small>
          </section>
        </CardHeader>
      </Card>
    </Link>
  );
}
