import React from "react";
import VideoEmbeedSP from "./VideoEmbeedSP";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function SpecialFeaturesCard({ spTitulo, spLink }) {
  return (
    <Card style={cardStyle} className="py-4 m-1 w-72 h-96">
      <CardHeader className="text-center">
        <h4 className="font-bold text-large">{spTitulo}</h4>
      </CardHeader>
      <CardBody>
        <VideoEmbeedSP videoUrl={spLink} style={videoStyle} className="w-full h-full" />
      </CardBody>
    </Card>
  );
}

const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const videoStyle = {
  width: '100%',
  height: '100%',
};
