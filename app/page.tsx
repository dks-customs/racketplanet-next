import Link from "next/link";
import pageMetadata from "../util/pageMetadata";
import LoadMore from "../components/load-more/load-more";
import getPostsPreviews from "../graphql/getPostsPreviews";
import PostsList from "../components/posts-list/posts-list";

export default async function Home() {
  const posts = await getPostsPreviews();

  return (
    <main className="index layout-container">
      <h1>Strona główna</h1>
      {posts && (
        <>
          <PostsList posts={posts.items.map((item) => item.node)} />
          <LoadMore afterCursor={posts.endCursor} />
        </>
      )}
    </main>
  );
}

export const metadata = pageMetadata({
  url: "/",
  titleFollowUp: "Centrum Sportów Rakietowych",
  titleFirst: true,
  description:
    "Najnowsze informacje, wydarzenia, relacje, wywiady, poradniki i wiele innych ze sportów rakietowych z kraju i ze świata.",
  twitterCard: "summary",
});
