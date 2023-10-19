import Link from "next/link";
import pageMetadata from "../util/pageMetadata";
import LoadMore from "../components/load-more/load-more";
import getPostsPreviews from "../graphql/getPostsPreviews";
import PostsList from "../components/posts-list/posts-list";
import Hero from "../components/post-preview/components/hero/hero";
import getHomePosts from "../graphql/getHomePosts";
import { POSTS_PER_PAGE } from "../constants/constants";
import LoadMoreHome from "../components/load-more-home/load-more-home";

export default async function Home() {
  const posts = await getHomePosts();

  if (posts) {
    const newestThree = posts.newest.slice(0, 3);
    const remainingNewest = posts.newest.slice(3, POSTS_PER_PAGE);
    const remainig = posts.remaining;

    return (
      <main className="index layout-container">
        {posts.hero && <Hero post={posts.hero} />}
        <div className="index-top">
          <div className="index-top__main">
            {newestThree.length > 0 && (
              <PostsList posts={newestThree.map((item) => item)} />
            )}
          </div>
          <div className="index-top__aside">
            {posts.sticky && <Hero post={posts.sticky} />}
          </div>
        </div>
        <div className="index-bottom">
          <div className="index-bottom__main">
            {remainingNewest.length > 0 && (
              <PostsList posts={remainingNewest.map((item) => item)} />
            )}
          </div>
          <div className="index-bottom__aside">{/* CATEGORIES */}</div>
        </div>
        {posts.remaining.length > 0 && (
          <div className="index-remaining">
            <LoadMoreHome posts={posts.remaining} />
          </div>
        )}
      </main>
    );
  }
}

export const metadata = pageMetadata({
  url: "/",
  titleFollowUp: "Centrum Sportów Rakietowych",
  titleFirst: true,
  description:
    "Najnowsze informacje, wydarzenia, relacje, wywiady, poradniki i wiele innych ze sportów rakietowych z kraju i ze świata.",
  twitterCard: "summary",
});
