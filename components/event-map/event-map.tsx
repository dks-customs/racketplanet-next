"use client";

import * as maptilersdk from "@maptiler/sdk";
import { useEffect, useRef } from "react";
import { MAPTILER_API_KEY } from "../../constants/constants";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./event-map.scss";

maptilersdk.config.apiKey = MAPTILER_API_KEY;

type EventMapProps = {
  address?: string;
  lat?: number;
  lng?: number;
};

export default function EventMap({ address, lat, lng }: EventMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | maptilersdk.Map>(null);

  useEffect(() => {
    if (lat && lng && address) {
      if (map.current) return;

      map.current = new maptilersdk.Map({
        container: mapContainer.current || "",
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 12,
      });

      const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
        `<div><p>${address}</p><a href="http://www.google.com/maps/place/${lat},${lng}" target="_blank">Pokaż w Google&nbsp;&rarr;</a></div>`
      );

      new maptilersdk.Marker({ color: "red" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);
    }
  }, []);

  return (
    <div className="event-map">
      <div ref={mapContainer} className="event-map-container" />
    </div>
  );
}
