import { APIPostPreview } from "../graphql/types/post-preview";

export default function filterHiddenPosts(post: { node: APIPostPreview }) {
  let isHidden = false;
  const categories = post.node.categories.nodes;

  categories.forEach((category) => {
    if (category.slug === "hidden") isHidden = true;
  });

  return !isHidden;
}
