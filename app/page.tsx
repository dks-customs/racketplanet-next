import Link from "next/link";
import pageMetadata from "../util/pageMetadata";
import { POSTS_PER_PAGE } from "../constants/constants";
import getPosts from "../api/getPosts";
import MorePosts from "../components/more-posts/more-posts";

export default async function Page() {
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
      {posts.haveNextPage && (
        <MorePosts afterPostCursor={posts.items[POSTS_PER_PAGE - 1].cursor} />
      )}
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
