import Link from "next/link";
import { APIPostPreview } from "../../graphql/types/post-preview";
import "./side-post-preview.scss";
import FeaturedImage from "../featured-image/featured-image";
import PostSports from "../post-sports/post-sports";
import stripHtmlTags from "../../util/stripHtmlTags";
import { routes } from "../../constants/constants";

type SidePostPreviewProps = {
  post: APIPostPreview;
  morePosts?: APIPostPreview[];
};

export default function SidePostPreview({
  post,
  morePosts,
}: SidePostPreviewProps) {
  const featuredImage = post.featuredImage?.node;
  const sports = post.sports.nodes;

  return (
    <article className="side-post-preview">
      <Link
        href={`/${post.databaseId}/${post.slug}`}
        className="side-post-preview__image post-preview-small-screen-image"
      >
        <FeaturedImage
          src={featuredImage?.sourceUrl}
          alt={post.title}
          availableSizes={featuredImage?.mediaDetails.sizes}
          loading="lazy"
          sizes="(min-width: 576px) 400px, 100vw"
        />
      </Link>
      <div className="side-post-preview__text">
        {sports.length > 0 && (
          <div className="side-post-preview__text__taxonomies post-preview-taxonomies">
            {<PostSports sports={post.sports.nodes} />}
          </div>
        )}
        <h2 className="side-post-preview__text__title post-preview-small-screen-title">
          <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
            {stripHtmlTags(post.title, false)}
          </Link>
        </h2>
      </div>
    </article>
  );
}
