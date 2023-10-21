import pageMetadata from "../util/pageMetadata";
import PostsList from "../components/posts-list/posts-list";
import getHomePosts from "../graphql/getHomePosts";
import { POSTS_PER_PAGE, POSTS_PER_PAGE_HOME } from "../constants/constants";
import LoadMoreHome from "../components/load-more-home/load-more-home";
import PostPreview from "../components/post-preview/post-preview";
import "./index.scss";
import SidePostPreview from "../components/side-post-preview/side-post-preview";
import PlacesMapPreview from "../components/places-map-preview/places-map-preview";

export default async function Home() {
  const posts = await getHomePosts();

  if (posts) {
    const newestThree = posts.newest.slice(0, 3);
    const newestRemaining = posts.newest.slice(3, POSTS_PER_PAGE_HOME);
    const categories = Object.values(posts.categories);

    return (
      <main className="index layout-container">
        {posts.hero && <PostPreview variant="hero" post={posts.hero} />}
        <div className="index-top">
          <div className="index-top__main">
            {newestThree.length > 0 && (
              <PostsList posts={newestThree.map((item) => item)} />
            )}
          </div>
          <div className="index-top__aside">
            {posts.sticky && (
              <SidePostPreview post={posts.sticky} label="Polecamy" />
            )}
            <PlacesMapPreview />
          </div>
        </div>
        <div className="index-bottom">
          <div className="index-bottom__main">
            {newestRemaining.length > 0 && (
              <PostsList posts={newestRemaining.map((item) => item)} />
            )}
          </div>
          <div className="index-bottom__aside">
            <div className="index-bottom__aside__title">Jeśli cię ominęło</div>
            {categories.map((posts, index) => (
              <SidePostPreview
                post={posts[0]}
                label={posts[0].categories.nodes[0].name}
                key={`index-categories-${index}`}
                morePosts={posts.slice(1)}
              />
            ))}
          </div>
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
