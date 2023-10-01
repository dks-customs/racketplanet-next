import { APIPostPreview } from "../../../../api/types/post-preview";
import "./hero.scss";

type HeroProps = {
  post: APIPostPreview;
  showSport: boolean;
  showCategory: boolean;
};

export default function Hero({
  post,
  showCategory = true,
  showSport = true,
}: HeroProps) {
  return <article>{post.title}</article>;
}
