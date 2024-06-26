import React from "react";
import VideoEmbeedSP from "./VideoEmbeedSP";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function SpecialFeaturesCard({ filmoteca }) {
  return (
    <Card className="py-4 m-1 w-72 h-96">
      <CardHeader className="text-center flex justify-center items-center">
        <h4 className="font-bold text-large">Especial Filmoteca</h4>
      </CardHeader>
      <CardBody className="object-cover w-full h-full overflow-hidden">
        <div className="w-full h-full">
          <VideoEmbeedSP videoUrl={filmoteca} className="w-full h-full" />
        </div>
      </CardBody>
    </Card>
  );
}
