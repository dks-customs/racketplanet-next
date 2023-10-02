import { routes } from "../../constants/constants";
import pageMetadata from "../../util/pageMetadata";
import "./map.scss";

export default async function Page() {
  return <main className="map layout-container">Racket Mapa</main>;
}

export const metadata = pageMetadata({
  url: routes.RACKET_MAPA,
  titleFollowUp: "Racket Mapa",
  description: "Znajdź najbliższe miejsce do gry w Twoją ulubioną dyscyplinę",
  twitterCard: "summary",
});
