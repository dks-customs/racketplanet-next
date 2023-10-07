import PlacesMap from "../../components/places-map/places-map";
import { routes } from "../../constants/constants";
import getPlaces from "../../graphql/getPlaces";
import getSports from "../../graphql/getSports";
import pageMetadata from "../../util/pageMetadata";
import "./map.scss";

export default async function RacketMapa() {
  const places = await getPlaces();
  const sports = await getSports();

  return (
    <main className="racket-mapa layout-container">
      <PlacesMap places={places} sports={sports} />
    </main>
  );
}

export const metadata = pageMetadata({
  url: routes.RACKET_MAPA,
  titleFollowUp: "Racket Mapa",
  description: "Znajdź najbliższe miejsce do gry w Twoją ulubioną dyscyplinę",
  twitterCard: "summary",
});
