import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import "./vertical.scss";
import FeaturedImage from "../../../featured-image/featured-image";
import PostSports from "../../../post-sports/post-sports";
import PostCategories from "../../../post-categories/post-categories";
import prepareExcerpt from "../../../../util/prepareExcerpt";
import PostExcerpt from "../../../post-excerpt/post-excerpt";
import PostDate from "../../../post-date/post-date";

type PostPreviewVerticalProps = {
  post: APIPostPreview;
  showSport: boolean;
  showCategory: boolean;
};

export default function PostPreviewVertical({
  post,
  showCategory = true,
  showSport = true,
}: PostPreviewVerticalProps) {
  const featuredImage = post.featuredImage?.node;
  const categories = post.categories.nodes;
  const sports = post.sports.nodes;

  return (
    <article className="post-preview-vertical">
      <Link
        href={`/${post.databaseId}/${post.slug}`}
        className="post-preview-vertical__image"
      >
        <FeaturedImage
          src={featuredImage?.sourceUrl}
          alt={post.title}
          availableSizes={featuredImage?.mediaDetails.sizes}
          loading="lazy"
        />
      </Link>
      {((showCategory && categories.length > 0) ||
        (showSport && sports.length > 0)) && (
        <div className="post-preview-vertical__taxonomies">
          {showSport && <PostSports sports={post.sports.nodes} />}
          {showCategory && (
            <PostCategories categories={post.categories.nodes} />
          )}
        </div>
      )}
      <h2 className="post-preview-vertical__title">
        <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
          {post.title}
        </Link>
      </h2>
      {prepareExcerpt(post.excerpt) && (
        <div className="post-preview-vertical__excerpt">
          <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
        </div>
      )}
      <div className="post-preview-vertical__date">
        <PostDate date={post.date} />
      </div>
    </article>
  );
}
