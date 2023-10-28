import Link from "next/link";
import { APIPostPreview } from "../../graphql/types/post-preview";
import PostPreviewBasic from "./components/post-preview-basic/post-preview-basic";
import "./posts-list-basic.scss";

type PostsListBasic = {
  posts: APIPostPreview[];
};

export default function PostsListBasic({ posts }: PostsListBasic) {
  if (posts.length > 0) {
    return (
      <ul className="posts-list-basic">
        {posts.map((post) => (
          <li key={`posts-list-basic-${post.id}`}>
            <PostPreviewBasic post={post} />
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
