import { APIPostPreview } from "../../graphql/types/post-preview";
import Hero from "./components/hero/hero";
import PostPreviewHorizontal from "./components/horizontal/horizontal";
import PostPreviewVertical from "./components/vertical/vertical";
import "./post-preview.scss";

type PostPreviewProps = {
  variant: "horizontal" | "vertical" | "hero" | "mini" | "sticky";
  post: APIPostPreview;
  showSport?: boolean;
  showCategory?: boolean;
};

export default function PostPreview({
  variant,
  post,
  showCategory = true,
  showSport = true,
}: PostPreviewProps) {
  switch (variant) {
    case "hero":
      return (
        <Hero post={post} showCategory={showCategory} showSport={showSport} />
      );
    case "horizontal":
      return (
        <PostPreviewHorizontal
          post={post}
          showCategory={showCategory}
          showSport={showSport}
        />
      );
    case "vertical":
      return (
        <PostPreviewVertical
          post={post}
          showCategory={showCategory}
          showSport={showSport}
        />
      );
    default:
      return null;
  }
}
