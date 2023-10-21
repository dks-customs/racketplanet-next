import Link from "next/link";
import { routes } from "../../constants/constants";
import "./places-map-preview.scss";

export default function PlacesMapPreview() {
  return (
    <div className="places-map-preview">
      <h2>Racket Mapa</h2>
      <p>Znajdź miejsce do gry w swoją ulubioną dyscyplinę</p>
      <Link href={routes.RACKET_MAPA} className="hoverable">
        Pokaż mapę&nbsp;&rarr;
      </Link>
    </div>
  );
}
