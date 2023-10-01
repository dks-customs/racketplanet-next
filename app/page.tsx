import getHomePosts from "../api/getHomePosts";
import pageMetadata from "../util/pageMetadata";

export default async function Page() {
  const res = await getHomePosts();
  const heroPost = res.edges[0]?.node;
  const morePosts = res.edges.slice(1);

  return <main className="index layout-container">Home</main>;
}

export const metadata = pageMetadata({
  url: "/",
  titleFollowUp: "Centrum Sportów Rakietowych",
  description:
    "Najnowsze informacje, wydarzenia, relacje, wywiady, poradniki i wiele innych ze sportów rakietowych z kraju i ze świata.",
  twitterCard: "summary",
  imageUrl: `/images/logo-sygnet.jpg`,
  imageAlt: "Racket Planet Logo",
});
