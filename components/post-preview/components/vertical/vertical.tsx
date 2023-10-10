import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import "./vertical.scss";

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
  return (
    <article className="post-preview-vertical">
      <h2>
        <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
          {post.title}
        </Link>
      </h2>
    </article>
  );
}
