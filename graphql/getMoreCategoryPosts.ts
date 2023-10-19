import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APIPostPreview } from "./types/post-preview";
import filterHiddenPosts from "../util/filterHiddenPosts";

type PostsPreviewsAPIData = {
  posts: {
    nodes: APIPostPreview[];
  };
};

export default async function getMoreCategoryPosts(categorySlug: string) {
  const data = await fetchApi<PostsPreviewsAPIData | undefined>(
    `
      query MorePosts {
        posts(first: 3, where: { categoryName: "${categorySlug}", orderby: { field: DATE, order: DESC } } ) {
          nodes {
            ${postPreviewFragment}
          }
        }
      }
    `
  );

  if (data?.posts) {
    const posts = data.posts.nodes.filter((post) =>
      filterHiddenPosts({ node: post })
    );

    if (posts.length > 0) {
      return posts;
    }
  }

  return undefined;
}
