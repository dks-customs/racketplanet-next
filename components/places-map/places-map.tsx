"use client";

import { useEffect, useState } from "react";
import { APIPlace } from "../../graphql/types/place";
import "./places-map.scss";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import SearchPlace from "./components/search-place/search-place";
import ChooseSportDropdown from "./components/choose-sport-dropdown/choose-sport-dropdown";
import { APISports } from "../../graphql/types/sports";
import useRenderMap from "./hooks/useRenderMap";

type PlacesMapProps = {
  places: APIPlace[];
  sports: APISports;
};

export default function PlacesMap({ places, sports }: PlacesMapProps) {
  const [sportPlaces, setSportPlaces] = useState<APIPlace[]>(places);
  const [searchedPlaceId, setSearchedPlaceId] = useState<number | undefined>(
    undefined
  );

  const mapContainer = useRenderMap(sportPlaces, searchedPlaceId);

  useEffect(() => {
    const sportPlacesIds = sportPlaces.map((place) => place.placeId);

    if (searchedPlaceId && !sportPlacesIds.includes(searchedPlaceId)) {
      setSearchedPlaceId(undefined);
    }
  }, [sportPlaces, searchedPlaceId]);

  return (
    <div className="places-map">
      <div className="archive-header">
        <h1 className="archive-title">Racket Mapa</h1>
        <p>Znajdź miejsce do gry w swoją ulubioną dyscyplinę</p>
      </div>
      <div className="places-map-search">
        <SearchPlace
          setSearchedPlaceId={setSearchedPlaceId}
          places={sportPlaces}
        />
        <ChooseSportDropdown
          setSportPlaces={setSportPlaces}
          allPlaces={places}
          sports={sports}
        />
      </div>
      <div className="places-map-map">
        <div className="places-map-root" ref={mapContainer}></div>
      </div>
    </div>
  );
}
