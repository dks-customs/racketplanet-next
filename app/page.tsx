import getHomePosts from "../api/getHomePosts";
import pageMetadata from "../util/pageMetadata";

export default async function Page() {
  const posts = await getHomePosts();
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return <main className="index layout-container">Strona główna</main>;
}

export const metadata = pageMetadata({
  url: "/",
  titleFollowUp: "Centrum Sportów Rakietowych",
  description:
    "Najnowsze informacje, wydarzenia, relacje, wywiady, poradniki i wiele innych ze sportów rakietowych z kraju i ze świata.",
  twitterCard: "summary",
});
