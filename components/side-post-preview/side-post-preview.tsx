import Link from "next/link";
import { APIPostPreview } from "../../graphql/types/post-preview";
import "./side-post-preview.scss";
import FeaturedImage from "../featured-image/featured-image";
import PostSports from "../post-sports/post-sports";
import PostCategories from "../post-categories/post-categories";
import stripHtmlTags from "../../util/stripHtmlTags";
import prepareExcerpt from "../../util/prepareExcerpt";
import PostExcerpt from "../post-excerpt/post-excerpt";
import { routes } from "../../constants/constants";

type SidePostPreviewProps = {
  post: APIPostPreview;
  morePosts?: APIPostPreview[];
  label: string;
};

export default function SidePostPreview({
  post,
  label,
  morePosts,
}: SidePostPreviewProps) {
  const featuredImage = post.featuredImage?.node;
  const sports = post.sports.nodes;

  return (
    <div className="side-post-preview-container">
      <div className="side-post-preview-label">{label}</div>
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
          />
        </Link>
        <div className="side-post-preview__text">
          {sports.length > 0 && (
            <div className="side-post-preview__text__taxonomies post-preview-taxonomies">
              {<PostSports sports={post.sports.nodes} />}
            </div>
          )}
          <h2 className="side-post-preview__text__title post-preview-small-screen-title">
            <Link
              href={`/${post.databaseId}/${post.slug}`}
              className="hoverable"
            >
              {stripHtmlTags(post.title, false)}
            </Link>
          </h2>
          {prepareExcerpt(post.excerpt) && (
            <div className="side-post-preview__text__excerpt post-preview-small-screen-excerpt">
              <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
            </div>
          )}
        </div>
      </article>
      {morePosts && morePosts.length > 0 && (
        <>
          <div className="side-post-preview-break"></div>
          <ul className="side-post-preview-more">
            {morePosts.map((post, index) => (
              <li
                className="side-post-preview-more-post"
                key={`side-post-preview-more-${post.id}`}
              >
                <article>
                  <h3>
                    <Link
                      href={`/${post.databaseId}/${post.slug}`}
                      className="hoverable"
                    >
                      {stripHtmlTags(post.title, false)}
                    </Link>
                  </h3>
                </article>
              </li>
            ))}
          </ul>
          <Link
            className="side-post-preview-link"
            href={`${routes.CATEGORY}/${morePosts[0].categories.nodes[0].slug}`}
          >
            Wszystkie <span>{morePosts[0].categories.nodes[0].name}</span>
            &nbsp;&rarr;
          </Link>
        </>
      )}
    </div>
  );
}
