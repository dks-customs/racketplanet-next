import { APIPostPreview } from "../../../../api/types/post-preview";
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
  return <article>{post.title}</article>;
}
