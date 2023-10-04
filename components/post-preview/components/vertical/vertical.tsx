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
  return <article>{post.title}</article>;
}
