import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "../graphql-fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APICategory } from "./types/category";

type CategoryAPIData = {
  categories: {
    nodes: APICategory[];
  };
};

export default async function getCategory(slug: string, after: string = "") {
  const data = await fetchApi<CategoryAPIData>(
    `
      query Category {
        categories(first: 1, where: {slug: "${slug}"}) {
          nodes {
            name
            categoryId
            posts(first: ${
              POSTS_PER_PAGE + 1
            }, where: { orderby: { field: DATE, order: DESC } }, after: "${after}") {
              edges {
                cursor
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

  const category = data.categories.nodes[0];

  if (category) {
    return {
      name: category.name,
      haveNextPage: category.posts.edges.length > POSTS_PER_PAGE,
      posts: category.posts.edges.slice(0, POSTS_PER_PAGE),
    };
  } else {
    return undefined;
  }
}
