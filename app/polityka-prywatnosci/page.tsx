import TimeAgo from "javascript-time-ago";
import { routes } from "../../constants/constants";
import getPrivacyPolicy from "../../graphql/getPrivacyPolicy";
import pageMetadata from "../../util/pageMetadata";
import "./privacy-policy.scss";
import LastModified from "../../components/last-modified/last-modified";
import PostContent from "../../components/post-content/post-content";

export default async function PrivacyPolicy() {
  const privacyPolicy = await getPrivacyPolicy();

  if (privacyPolicy) {
    return (
      <main className="privacy-policy layout-container">
        <div className="archive-header">
          <h1 className="archive-title">{privacyPolicy.title}</h1>
        </div>
        <LastModified date={privacyPolicy.modified} />
        <PostContent content={privacyPolicy.content} small />
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
