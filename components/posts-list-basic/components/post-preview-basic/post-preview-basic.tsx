import { APIPostPreview } from "../../../../graphql/types/post-preview";
import PostSports from "../../../post-sports/post-sports";
import PostCategories from "../../../post-categories/post-categories";
import PostDate from "../../../post-date/post-date";
import "./post-preview-basic.scss";
import PostExcerpt from "../../../post-excerpt/post-excerpt";
import prepareExcerpt from "../../../../util/prepareExcerpt";
import FeaturedImage from "../../../featured-image/featured-image";
import stripHtmlTags from "../../../../util/stripHtmlTags";
import PostMeta from "../../../post-meta/post-meta";

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
            {stripHtmlTags(post.title, false)}
          </h2>
          <div className="post-preview-basic__main__text__meta">
            <PostMeta
              categories={categories}
              sports={sports}
              date={post.date}
            />
          </div>
          {/* {prepareExcerpt(post.excerpt) && (
            <div className="post-preview-basic__main__text__excerpt">
              <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
            </div>
          )} */}
        </div>
        <div className="post-preview-basic__main__image">
          <FeaturedImage
            src={featuredImage?.sourceUrl}
            alt={post.title}
            availableSizes={featuredImage?.mediaDetails.sizes}
            loading="lazy"
            sizes="200px"
          />
        </div>
      </div>
      {/* {prepareExcerpt(post.excerpt) && (
        <div className="post-preview-basic__excerpt">
          <PostExcerpt excerpt={prepareExcerpt(post.excerpt)} />
        </div>
      )} */}
      <div className="post-preview-basic__meta">
        <PostMeta categories={categories} sports={sports} date={post.date} />
      </div>
    </article>
  );
}
