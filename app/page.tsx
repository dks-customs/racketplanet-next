import pageMetadata from "../util/pageMetadata";
import PostsList from "../components/posts-list/posts-list";
import getHomePosts from "../graphql/getHomePosts";
import LoadMoreHome from "../components/load-more-home/load-more-home";
import PostPreview from "../components/post-preview/post-preview";
import "./index.scss";
import CategorySlider from "../components/category-slider/category-slider";
import HeroMorePosts from "../components/hero-more-posts/hero-more-posts";

export default async function Home() {
  const posts = await getHomePosts();

  if (posts) {
    return (
      <main className="index">
        {(posts.hero || posts.heroMore) && (
          <section className="index__newest layout-container">
            {posts.hero && <PostPreview variant="hero" post={posts.hero} />}
            {posts.heroMore && <HeroMorePosts posts={posts.heroMore} />}
          </section>
        )}
        {posts.postsGroups.map((group, index) => {
          if (group.news.length > 0 || group.category.posts.length > 0) {
            return (
              <div
                className="index__posts-group index__posts-group--first"
                key={`index-posts-group-${index}`}
              >
                {group.category.posts.length > 0 && (
                  <section className="index__posts-group__category">
                    <div className="index__posts-group__category__title index__section-title layout-container">
                      {group.category.title}
                    </div>
                    <div className="index__posts-group__category__posts layout-container">
                      <CategorySlider
                        posts={group.category.posts}
                        index={index}
                      />
                    </div>
                  </section>
                )}
                {group.news.length > 0 && (
                  <section className="index__posts-group__news layout-container">
                    {index === 0 && (
                      <div className="index__posts-group__news__title index__section-title">
                        Ostatnie newsy
                      </div>
                    )}
                    <div className="index__posts-group__news__posts">
                      <PostsList posts={group.news} showCategory={false} />
                    </div>
                  </section>
                )}
              </div>
            );
          }
        })}
        {posts.remainingNews.length > 0 && (
          <div className="index__remaining layout-container">
            {posts.remainingNews.length > 0 && (
              <LoadMoreHome posts={posts.remainingNews} />
            )}
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
