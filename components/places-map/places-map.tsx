"use client";

import { useEffect, useState } from "react";
import { APIPlace } from "../../graphql/types/place";
import usePlacesMap from "./hooks/usePlacesMap";
import "./places-map.scss";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import SearchPlace from "./components/search-place/search-place";
import ChooseSportDropdown from "./components/choose-sport-dropdown/choose-sport-dropdown";
import { APISports } from "../../graphql/types/sports";

type PlacesMapProps = {
  places: APIPlace[];
  sports: APISports;
};

export default function PlacesMap({ places, sports }: PlacesMapProps) {
  const [sportPlaces, setSportPlaces] = useState<APIPlace[]>(places);
  const [searchedPlaceId, setSearchedPlaceId] = useState<number | undefined>(
    undefined
  );

  const mapContainer = usePlacesMap(sportPlaces, searchedPlaceId);

  useEffect(() => {
    const sportPlacesIds = sportPlaces.map((place) => place.placeId);

    if (searchedPlaceId && !sportPlacesIds.includes(searchedPlaceId)) {
      setSearchedPlaceId(undefined);
    }
  }, [sportPlaces, searchedPlaceId]);

  return (
    <div className="places-map">
      <h1>Racket Mapa</h1>
      <SearchPlace
        setSearchedPlaceId={setSearchedPlaceId}
        places={sportPlaces}
      />
      <ChooseSportDropdown
        setSportPlaces={setSportPlaces}
        allPlaces={places}
        sports={sports}
      />
      <div className="places-map-root" ref={mapContainer}></div>
    </div>
  );
}
