import Link from "next/link";
import pageMetadata from "../util/pageMetadata";
import getPosts from "../graphql/getPosts";
import LoadMore from "../components/load-more/load-more";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="index layout-container">
      <h1>Strona główna</h1>
      <ul className="posts">
        {posts.items.map((post) => (
          <li key={post.node.id}>
            <article>
              <Link href={`/${post.node.databaseId}/${post.node.slug}`}>
                {post.node.title}
              </Link>
            </article>
          </li>
        ))}
      </ul>
      {posts.hasNextPage && <LoadMore afterCursor={posts.endCursor} />}
    </main>
  );
}

export const metadata = pageMetadata({
  url: "/",
  titleFollowUp: "Centrum Sportów Rakietowych",
  description:
    "Najnowsze informacje, wydarzenia, relacje, wywiady, poradniki i wiele innych ze sportów rakietowych z kraju i ze świata.",
  twitterCard: "summary",
});
