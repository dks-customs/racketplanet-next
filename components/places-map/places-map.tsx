"use client";

import { useState } from "react";
import { APIPlace } from "../../graphql/types/place";
import usePlacesMap from "./hooks/usePlacesMap";
import "./places-map.scss";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import SearchPlace from "./components/search-place/search-place";

type PlacesMapProps = {
  places: APIPlace[];
};

export default function PlacesMap({ places }: PlacesMapProps) {
  const [sportPlaces, setSportPlaces] = useState<APIPlace[]>(places);
  const [searchedPlaceId, setSearchedPlaceId] = useState<number | undefined>(
    undefined
  );
  const mapContainer = usePlacesMap(sportPlaces, searchedPlaceId);

  return (
    <div className="places-map">
      <h1>Racket Mapa</h1>
      <SearchPlace
        setSearchedPlaceId={setSearchedPlaceId}
        places={sportPlaces}
      />
      <div className="places-map-root" ref={mapContainer}></div>
    </div>
  );
}
