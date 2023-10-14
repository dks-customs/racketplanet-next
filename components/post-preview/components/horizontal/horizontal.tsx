import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import "./horizontal.scss";
import PostSports from "../../../post-sports/post-sports";
import PostCategories from "../../../post-categories/post-categories";
import prepareExcerpt from "../../../../util/prepareExcerpt";
import PostExcerpt from "../../../post-excerpt/post-excerpt";
import FeaturedImage from "../../../featured-image/featured-image";
import PostDate from "../../../post-date/post-date";

type PostPreviewHorizontalProps = {
  post: APIPostPreview;
  showSport: boolean;
  showCategory: boolean;
};

export default function PostPreviewHorizontal({
  post,
  showCategory = true,
  showSport = true,
}: PostPreviewHorizontalProps) {
  const featuredImage = post.featuredImage?.node;

  return (
    <article className="post-preview-horizontal">
      <div className="post-preview-horizontal__text">
        <div className="post-preview-horizontal__text__date">
          <PostDate date={post.date} />
        </div>
        {(showCategory || showSport) && (
          <div className="post-preview-horizontal__text__taxonomies">
            {showSport && <PostSports sports={post.sports.nodes} />}
            {showCategory && (
              <PostCategories categories={post.categories.nodes} />
            )}
          </div>
        )}
        <h2 className="post-preview-horizontal__text__title">
          <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
            {post.title}
          </Link>
        </h2>
        {prepareExcerpt(post.excerpt) && (
          <div className="post-preview-horizontal__text__excerpt">
            <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
          </div>
        )}
      </div>
      <Link
        href={`/${post.databaseId}/${post.slug}`}
        className="post-preview-horizontal__image"
      >
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
