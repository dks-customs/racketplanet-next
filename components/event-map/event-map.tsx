"use client";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./event-map.scss";
import useMap from "./hooks/useMap";

type EventMapProps = {
  address?: string;
  lat?: number;
  lng?: number;
};

export default function EventMap({ address, lat, lng }: EventMapProps) {
  const mapContainer = useMap(lat, lng, address);

  return (
    <div className="event-map">
      <div ref={mapContainer} className="event-map-container"></div>
    </div>
  );
}
