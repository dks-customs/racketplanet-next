import { APIPostPreview } from "../../../../graphql/types/post-preview";
import "./post-preview-basic.scss";
import FeaturedImage from "../../../featured-image/featured-image";
import stripHtmlTags from "../../../../util/stripHtmlTags";
import PostMeta from "../../../post-meta/post-meta";
import Link from "next/link";
import { routes } from "../../../../constants/constants";

type PostPreviewBasicProps = {
  post: APIPostPreview;
};

export default function PostPreviewBasic({ post }: PostPreviewBasicProps) {
  const featuredImage = post.featuredImage?.node;
  const categories = post.categories.nodes;
  const sports = post.sports.nodes;

  return (
    <article className="post-preview-basic">
      <div className="post-preview-basic__main">
        <div className="post-preview-basic__main__text">
          <h2 className="post-preview-basic__main__text__title">
            <Link
              href={`/${post.databaseId}/${post.slug}`}
              className="hoverable"
            >
              {stripHtmlTags(post.title, false)}
            </Link>
          </h2>
          <div className="post-preview-basic__main__text__meta">
            <PostMeta
              categories={categories}
              sports={sports}
              date={post.date}
            />
          </div>
        </div>
        <Link
          href={`/${post.databaseId}/${post.slug}`}
          className="post-preview-basic__main__image"
        >
          <FeaturedImage
            src={featuredImage?.sourceUrl}
            alt={post.title}
            availableSizes={featuredImage?.mediaDetails.sizes}
            loading="lazy"
            sizes="200px"
          />
        </Link>
      </div>
      <div className="post-preview-basic__meta">
        <PostMeta categories={categories} sports={sports} date={post.date} />
      </div>
    </article>
  );
}
