import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import "./horizontal.scss";

type PostPreviewHorizontalProps = {
  post: APIPostPreview;
  showSport: boolean;
  showCategory: boolean;
};

export default function PostPreviewHorizontal({
  post,
  showCategory = true,
  showSport = true,
}: PostPreviewHorizontalProps) {
  return (
    <article className="post-preview-horizontal">
      <h2>
        <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
          {post.title}
        </Link>
      </h2>
    </article>
  );
}
