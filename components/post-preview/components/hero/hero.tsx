import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import prepareExcerpt from "../../../../util/prepareExcerpt";
import PostExcerpt from "../../../post-excerpt/post-excerpt";
import "./hero.scss";
import PostCategories from "../../../post-categories/post-categories";
import PostSports from "../../../post-sports/post-sports";
import FeaturedImage from "../../../featured-image/featured-image";
import PostDate from "../../../post-date/post-date";

type HeroProps = {
  post: APIPostPreview;
  showSport?: boolean;
  showCategory?: boolean;
};

export default function Hero({
  post,
  showCategory = true,
  showSport = true,
}: HeroProps) {
  const featuredImage = post.featuredImage?.node;
  const categories = post.categories.nodes;
  const sports = post.sports.nodes;

  return (
    <article className="hero">
      <div className="hero__text">
        {((showCategory && categories.length > 0) ||
          (showSport && sports.length > 0)) && (
          <div className="hero__text__taxonomies">
            {showSport && <PostSports sports={post.sports.nodes} />}
            {showCategory && (
              <PostCategories categories={post.categories.nodes} />
            )}
          </div>
        )}
        <h2 className="hero__text__title">
          <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
            {post.title}
          </Link>
        </h2>
        {prepareExcerpt(post.excerpt) && (
          <div className="hero__text__excerpt">
            <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
          </div>
        )}
      </div>
      <Link href={`/${post.databaseId}/${post.slug}`} className="hero__image">
        <FeaturedImage
          src={featuredImage?.sourceUrl}
          alt={post.title}
          availableSizes={featuredImage?.mediaDetails.sizes}
          loading="lazy"
        />
      </Link>
    </article>
  );
}
