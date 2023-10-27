import Link from "next/link";
import { APIPostPreview } from "../../graphql/types/post-preview";
import stripHtmlTags from "../../util/stripHtmlTags";
import "./hero-more-posts.scss";
import FeaturedImage from "../featured-image/featured-image";

type HeroMorePostsProps = {
  posts: APIPostPreview[];
};

export default function HeroMorePosts({ posts }: HeroMorePostsProps) {
  if (posts.length > 0) {
    return (
      <div className="hero-more-posts">
        {posts.map((post) => {
          const featuredImage = post.featuredImage?.node;

          return (
            <li
              className="hero-more-post"
              key={`hero-posts-more-${post.databaseId}`}
            >
              {post.featuredImage && (
                <Link
                  href={`/${post.databaseId}/${post.slug}`}
                  className="hero-more-post__image"
                >
                  <FeaturedImage
                    src={featuredImage?.sourceUrl}
                    alt={post.title}
                    availableSizes={featuredImage?.mediaDetails.sizes}
                    loading="eager"
                    sizes="200px"
                  />
                </Link>
              )}
              <h2 className="hero-more-post__title">
                <Link
                  href={`/${post.databaseId}/${post.slug}`}
                  className="hoverable"
                >
                  {stripHtmlTags(post.title, false)}
                </Link>
              </h2>
            </li>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
