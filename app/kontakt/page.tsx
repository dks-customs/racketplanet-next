import { routes } from "../../constants/constants";
import pageMetadata from "../../util/pageMetadata";
import "./contact.scss";

export default async function Contact() {
  return <main className="contact layout-container">Kontakt</main>;
}

export const metadata = pageMetadata({
  url: routes.CONTACT,
  titleFollowUp: "Kontakt",
  description:
    "Cenimy sobie krytykę oraz obiecujemy, że każdą wiadomością zajmiemy się najszybciej jak to będzie możliwe",
  twitterCard: "summary",
});
