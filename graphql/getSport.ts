import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APISport } from "./types/sport";
import filterHiddenPosts from "../util/filterHiddenPosts";

type SportAPIData = {
  sports: {
    nodes: APISport[];
  };
};

export default async function getSport(slug: string, after: string = "") {
  const data = await fetchApi<SportAPIData | undefined>(
    `
      query Sport {
        sports(first: 1, where: {slug: "${slug}"}) {
          nodes {
            name
            sportId
            posts(first: ${POSTS_PER_PAGE}, where: { orderby: { field: DATE, order: DESC } }, after: "${after}") {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  ${postPreviewFragment}
                }
              }
            }
            pages {
              nodes {
                id
                slug
                title
              }
            }
          }
        }
      }
    `
  );

  const sport = data?.sports.nodes[0];

  if (sport) {
    const posts = sport.posts.edges.filter(filterHiddenPosts);

    return {
      name: sport.name,
      hasNextPage: sport.posts.pageInfo.hasNextPage,
      endCursor: sport.posts.pageInfo.endCursor,
      posts: posts,
      pages: sport.pages.nodes,
    };
  }

  return undefined;
}
