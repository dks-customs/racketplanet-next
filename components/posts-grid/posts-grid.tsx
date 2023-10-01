import { APIPostPreview } from "../../api/types/post-preview";
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
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <PostPreview variant="vertical" post={post} />
      ))}
    </div>
  );
}
