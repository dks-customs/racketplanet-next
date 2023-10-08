import TimeAgo from "javascript-time-ago";
import { routes } from "../../constants/constants";
import getPrivacyPolicy from "../../graphql/getPrivacyPolicy";
import pageMetadata from "../../util/pageMetadata";
import "./privacy-policy.scss";
import LastModified from "../../components/last-modified/last-modified";

export default async function PrivacyPolicy() {
  const privacyPolicy = await getPrivacyPolicy();

  if (privacyPolicy) {
    return (
      <main className="privacy-policy layout-container">
        <h1>{privacyPolicy.title}</h1>
        <LastModified date={privacyPolicy.modified} />
        <div dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}></div>
      </main>
    );
  } else {
    return null;
  }
}

export const metadata = pageMetadata({
  url: routes.PRIVACY_POLICY,
  titleFollowUp: "Polityka Prywatności",
  description: "Polityka prywatności Racket Planet",
  twitterCard: "summary",
});
