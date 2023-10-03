import { routes } from "../../constants/constants";
import pageMetadata from "../../util/pageMetadata";
import "./about.scss";

export default async function About() {
  return <main className="about layout-container">O nas</main>;
}

export const metadata = pageMetadata({
  url: routes.ABOUT,
  titleFollowUp: "O nas",
  description:
    "Misją naszej strony jest zwiększenie świadomości na temat szerokiej gamy sportów rakietowych, w tym tych obecnie niszowych",
  twitterCard: "summary",
});
