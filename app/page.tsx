import pageMetadata from "../util/pageMetadata";
import PostsList from "../components/posts-list/posts-list";
import getHomePosts from "../graphql/getHomePosts";
import LoadMoreHome from "../components/load-more-home/load-more-home";
import PostPreview from "../components/post-preview/post-preview";
import "./index.scss";
import SidePostPreview from "../components/side-post-preview/side-post-preview";
import CategorySlider from "../components/category-slider/category-slider";
import HeroMorePosts from "../components/hero-more-posts/hero-more-posts";

export default async function Home() {
  const posts = await getHomePosts();

  if (posts) {
    return (
      <main className="index">
        {(posts.hero || posts.heroMore) && (
          <section className="index__newest">
            <section className="index__newest__hero layout-container">
              {posts.hero && <PostPreview variant="hero" post={posts.hero} />}
              {posts.heroMore && <HeroMorePosts posts={posts.heroMore} />}
            </section>
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
                    <div className="index__posts-group__category__title layout-container">
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
                  <div className="index__posts-group__chrono">
                    <section className="index__posts-group__chrono__news">
                      {index === 0 && (
                        <div className="index__posts-group__chrono__news__title">
                          Ostatnie newsy
                        </div>
                      )}
                      <div className="index__posts-group__chrono__news__posts">
                        <PostsList posts={group.news} />
                      </div>
                    </section>
                    {index === 0 && posts.sticky && (
                      <section className="index-sticky">
                        <div className="index-sticky__title">Polecamy</div>
                        <div className="index-sticky__post">
                          <SidePostPreview post={posts.sticky} />
                        </div>
                      </section>
                    )}
                  </div>
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
