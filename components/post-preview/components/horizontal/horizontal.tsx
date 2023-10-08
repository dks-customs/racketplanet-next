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
    <article>
      <Link href={`/${post.databaseId}/${post.slug}`}>{post.title}</Link>
    </article>
  );
}
