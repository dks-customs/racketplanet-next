import { APIPostPreview } from "../../graphql/types/post-preview";
import stripHtmlTags from "../../util/stripHtmlTags";
import "./hero-more-posts.scss";

type HeroMorePostsProps = {
  posts: APIPostPreview[];
};

export default function HeroMorePosts({ posts }: HeroMorePostsProps) {
  if (posts.length > 0) {
    return (
      <div className="hero-more-posts">
        {posts.map((post) => (
          <li key={`hero-posts-more-${post.databaseId}`}>
            {stripHtmlTags(post.title)}
          </li>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
