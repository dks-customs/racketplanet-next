import { useEffect, useRef, useState } from "react";
import { APIPlace } from "../../../graphql/types/place";
import * as maptilersdk from "@maptiler/sdk";
import { MAPTILER_API_KEY, routes } from "../../../constants/constants";

maptilersdk.config.apiKey = MAPTILER_API_KEY;

export default function usePlacesMap(
  places: APIPlace[],
  searchedPlaceId?: APIPlace["placeId"]
) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | maptilersdk.Map>(null);
  const [markers, setMarkers] = useState<maptilersdk.Marker[]>([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current || "",
        style: maptilersdk.MapStyle.STREETS,
        center: [19.1451, 51.9194],
        zoom: 5.8,
      });
    }

    if (map.current) {
      markers.forEach((marker) => marker.remove());

      const newMarkers: maptilersdk.Marker[] = [];

      places.forEach((place) => {
        const { name, description, webpage } = place.placeAcf;
        const { lat, lng, address } = place.placeAcfOsm;

        if (lat && lng && address && name) {
          const sports = `
            <div class="places-marker-sports">
              ${place.sports.nodes.map(
                (sport) =>
                  `<a href="${routes.SPORT}/${sport.slug}">${sport.name}</a>`
              )}
            </div>
          `;

          const popup = new maptilersdk.Popup().setHTML(`
          <div class="place-marker">
            <p>${name}</p>
            ${sports}
            <p>${address}</p>
            ${description ? `<p>${place.placeAcf.description}</p>` : ""}
            ${
              webpage
                ? `<a href="${place.placeAcf.webpage}" target="_blank">Strona internetowa&nbsp;&rarr;</a>`
                : ""
            }
            <a href="http://www.google.com/maps/place/${
              place.placeAcfOsm.lat
            },${
            place.placeAcfOsm.lng
          }" target="_blank">Pokaż w Google&nbsp;&rarr;</a>
          </div>
          `);

          const marker = new maptilersdk.Marker({
            color: searchedPlaceId === place.placeId ? "red" : "green",
          })
            .setLngLat([lng, lat])
            .setPopup(popup);

          if (map.current) marker.addTo(map.current);

          if (searchedPlaceId === place.placeId) {
            map.current?.setCenter([lng, lat]);
            map.current?.zoomTo(12);
            marker.togglePopup();
          }

          newMarkers.push(marker);
        }
      });

      setMarkers(newMarkers);
    }
  }, [places, searchedPlaceId]);

  return mapContainer;
}
