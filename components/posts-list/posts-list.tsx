import { APIPostPreview } from "../../graphql/types/post-preview";
import PostPreview from "../post-preview/post-preview";
import "./posts-list.scss";

type PostsListProps = {
  posts: APIPostPreview[];
  showSport?: boolean;
  showCategory?: boolean;
  detailed?: boolean;
};

export default function PostsList({
  posts,
  showSport = true,
  showCategory = true,
}: PostsListProps) {
  if (posts.length > 0) {
    return (
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={`posts-list-${post.id}`}>
            <PostPreview
              variant="horizontal"
              post={post}
              showSport={showSport}
              showCategory={showCategory}
            />
          </li>
        ))}
      </ul>
    );
  } else {
    return <div className="posts-list-no-posts">Brak artykułów</div>;
  }
}
