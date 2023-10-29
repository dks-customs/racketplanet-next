import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import "./vertical.scss";
import FeaturedImage from "../../../featured-image/featured-image";
import PostSports from "../../../post-sports/post-sports";
import PostCategories from "../../../post-categories/post-categories";
import prepareExcerpt from "../../../../util/prepareExcerpt";
import PostExcerpt from "../../../post-excerpt/post-excerpt";
import PostDate from "../../../post-date/post-date";
import stripHtmlTags from "../../../../util/stripHtmlTags";
import PostMeta from "../../../post-meta/post-meta";

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
          sizes="(min-width: 576px) 400px, 100vw"
        />
      </Link>
      <h2 className="post-preview-vertical__title">
        <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
          {stripHtmlTags(post.title, false)}
        </Link>
      </h2>
      <div className="post-preview-vertical__meta">
        <PostMeta categories={categories} sports={sports} date={post.date} />
      </div>
    </article>
  );
}
