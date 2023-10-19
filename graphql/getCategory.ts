import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APICategory } from "./types/category";
import filterHiddenPosts from "../util/filterHiddenPosts";

type CategoryAPIData = {
  categories: {
    nodes: APICategory[];
  };
};

export default async function getCategory(slug: string, after: string = "") {
  const data = await fetchApi<CategoryAPIData | undefined>(
    `
      query Category {
        categories(first: 1, where: {slug: "${slug}"}) {
          nodes {
            name
            categoryId
            posts(first: ${POSTS_PER_PAGE}, where: { orderby: { field: DATE, order: DESC } }, after: "${after}") {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  ${postPreviewFragment}
                }
              }
            }
          }
        }
      }
    `
  );

  const category = data?.categories.nodes[0];

  if (category) {
    const posts = category.posts.edges.filter(filterHiddenPosts);

    if (posts.length > 0) {
      return {
        name: category.name,
        hasNextPage: category.posts.pageInfo.hasNextPage,
        endCursor: category.posts.pageInfo.endCursor,
        posts: posts,
      };
    }
  }

  return undefined;
}
