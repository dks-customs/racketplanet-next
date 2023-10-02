import { routes } from "../../constants/constants";
import pageMetadata from "../../util/pageMetadata";
import "./events.scss";

export default async function Page() {
  return <main className="events layout-container">Wydarzenia</main>;
}

export const metadata = pageMetadata({
  url: routes.EVENTS,
  titleFollowUp: "Wydarzenia",
  description: "Kalendarz rakietowych imprez sportowych",
  twitterCard: "summary",
  imageUrl: `/images/logo-sygnet.jpg`,
  imageAlt: "Racket Planet Logo",
});
