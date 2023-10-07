import { Dispatch, SetStateAction, useState } from "react";
import { APIPlace } from "../../../../graphql/types/place";
import "./search-place.scss";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import SearchSVG from "../../../svg/search";
import removeAccents from "remove-accents";

type PlacesMapSearchInputProps = {
  setSearchedPlaceId: Dispatch<SetStateAction<APIPlace["placeId"]>>;
  places: APIPlace[];
};

type Suggestion = {
  placeId: APIPlace["placeId"];
  name?: APIPlace["placeAcf"]["name"];
  sports: string[];
  address?: APIPlace["placeAcfOsm"]["address"];
};

export default function SearchPlace({
  places,
  setSearchedPlaceId,
}: PlacesMapSearchInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const initSuggestions = () => {
    setSuggestions(
      places.map((place) => ({
        placeId: place.placeId,
        name: place.placeAcf.name,
        sports: place.sports.nodes.map((sport) => sport.name),
        address: place.placeAcfOsm?.address,
      }))
    );
  };

  const filterSuggestionsBySearchText = (
    option: Suggestion,
    props: { text: string }
  ) => {
    const { name, sports, address } = option;
    const { text } = props;

    const keywords = removeAccents(text).split(" ");

    const suggestionNameHasKeyword = (keyword: string) =>
      removeAccents((name || "").toLowerCase()).indexOf(
        keyword.toLowerCase()
      ) !== -1;

    const suggestionAddresHasKeyword = (keyword: string) =>
      removeAccents((address || "").toLowerCase()).indexOf(
        keyword.toLowerCase()
      ) !== -1;

    const suggestionSportsHaveKeyword = (keyword: string) =>
      sports.filter(
        (sport) =>
          removeAccents(sport.toLowerCase()).indexOf(keyword.toLowerCase()) !==
          -1
      ).length > 0;

    const suggestionHasKeywords = (() => {
      const foundKeywords = keywords.filter(
        (keyword) =>
          suggestionNameHasKeyword(keyword) ||
          suggestionAddresHasKeyword(keyword) ||
          suggestionSportsHaveKeyword(keyword)
      );

      return foundKeywords.length !== 0;
    })();

    return suggestionHasKeywords;
  };

  return (
    <div className="places-map-search-input">
      <div className="racket-mapa__search">
        <AsyncTypeahead
          filterBy={filterSuggestionsBySearchText}
          id="async-example"
          isLoading={false}
          labelKey="name"
          minLength={3}
          onSearch={initSuggestions}
          options={suggestions}
          placeholder="Wyszukaj po mieście, sporcie lub nazwie"
          renderMenuItemChildren={(option: Suggestion, props) => (
            <div
              className="rm-search-option"
              onClick={() => setSearchedPlaceId(option.placeId)}
              key={`search-suggestion-${option.placeId}`}
            >
              <div className="rm-search-option__sports">
                {option.sports.map((sport: string) => (
                  <span
                    className="rm-search-option__sports__sport"
                    key={`search-suggestion-${option.placeId}-${sport}`}
                  >
                    {sport}
                  </span>
                ))}
              </div>
              <div className="rm-search-option__name">{option.name}</div>
              <div className="rm-search-option__address">{option.address}</div>
            </div>
          )}
        />
        <SearchSVG />
      </div>
    </div>
  );
}
