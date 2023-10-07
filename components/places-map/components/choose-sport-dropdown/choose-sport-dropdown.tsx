import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APIPlace } from "../../../../graphql/types/place";
import "./choose-sport-dropdown.scss";
import { Dropdown } from "react-bootstrap";
import { APISports } from "../../../../graphql/types/sports";

type ChooseSportDropdownProps = {
  setSportPlaces: Dispatch<SetStateAction<APIPlace[]>>;
  allPlaces: APIPlace[];
  sports: APISports;
};

export default function ChooseSportDropdown({
  allPlaces,
  setSportPlaces,
  sports,
}: ChooseSportDropdownProps) {
  const [currentSport, setCurrentSport] = useState<
    { name: string; slug: string } | undefined
  >();

  useEffect(() => {
    if (currentSport) {
      const sportPlaces = allPlaces.filter((place) => {
        const placeSportsSlugs = place.sports.nodes.map((sport) => sport.slug);

        return placeSportsSlugs.includes(currentSport.slug);
      });

      setSportPlaces(sportPlaces);
    } else {
      setSportPlaces(allPlaces);
    }
  }, [currentSport]);

  if (sports?.length > 0) {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {currentSport ? currentSport.name : "Wszystko"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCurrentSport(undefined)}>
            Wszystko
          </Dropdown.Item>
          {sports.map((sport) => (
            <Dropdown.Item
              key={sport.id}
              onClick={() =>
                setCurrentSport({
                  name: sport.name,
                  slug: sport.slug,
                })
              }
            >
              {sport.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return null;
  }
}
