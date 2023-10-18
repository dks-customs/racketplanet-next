import { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { MAPTILER_API_KEY } from "../../../constants/constants";

maptilersdk.config.apiKey = MAPTILER_API_KEY;

export default function useRenderEventMap(
  lat?: number,
  lng?: number,
  address?: string
) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | maptilersdk.Map>(null);

  useEffect(() => {
    if (lat && lng && address) {
      if (map.current) return;

      map.current = new maptilersdk.Map({
        container: mapContainer.current || "",
        style: maptilersdk.MapStyle.STREETS,
        center: [lng + 0.01, lat],
        zoom: 12,
      });

      const popup = new maptilersdk.Popup({ offset: 40 }).setHTML(
        `<div class="event-map-marker"><p class="event-map-marker__address">${address}</p><a class="event-map-marker__link" href="http://www.google.com/maps/place/${lat},${lng}" target="_blank">Pokaż w Google&nbsp;&rarr;</a></div>`
      );

      const marker = new maptilersdk.Marker({ color: "#10628a" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);

      marker.togglePopup();
    }
  }, []);

  return mapContainer;
}
