import { APIPostPreview } from "../../graphql/types/post-preview";
import PostPreview from "../post-preview/post-preview";
import "./posts-grid.scss";

type PostsGridProps = {
  posts: APIPostPreview[];
  showSport?: boolean;
  showCategory?: boolean;
};

export default function PostsGrid({
  posts,
  showSport = true,
  showCategory = true,
}: PostsGridProps) {
  if (posts.length > 0) {
    return (
      <ul className="posts-grid">
        {posts.map((post) => (
          <li key={`posts-grid-${post.id}`}>
            <PostPreview
              variant="vertical"
              post={post}
              showSport={showSport}
              showCategory={showCategory}
            />
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
