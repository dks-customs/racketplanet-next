import { routes } from "../../constants/constants";
import pageMetadata from "../../util/pageMetadata";
import "./privacy-policy.scss";

export default async function PrivacyPolicy() {
  return (
    <main className="privacy-policy layout-container">
      Polityka prywatności
    </main>
  );
}

export const metadata = pageMetadata({
  url: routes.PRIVACY_POLICY,
  titleFollowUp: "Polityka Prywatności",
  description: "Polityka prywatności Racket Planet",
  twitterCard: "summary",
});
