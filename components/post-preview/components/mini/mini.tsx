import { APIPostPreview } from "../../../../api/types/post-preview";
import "./mini.scss";

type PostPreviewMiniProps = {
  post: APIPostPreview;
  showSport: boolean;
  showCategory: boolean;
};

export default function PostPreviewMini({
  post,
  showCategory = true,
  showSport = true,
}: PostPreviewMiniProps) {
  return <article>{post.title}</article>;
}
