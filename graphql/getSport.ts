import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APISport } from "./types/sport";

type SportAPIData = {
  sports: {
    nodes: APISport[];
  };
};

export default async function getSport(slug: string, after: string = "") {
  const data = await fetchApi<SportAPIData>(
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

  const sport = data.sports.nodes[0];

  if (sport) {
    return {
      name: sport.name,
      hasNextPage: sport.posts.pageInfo.hasNextPage,
      endCursor: sport.posts.pageInfo.endCursor,
      posts: sport.posts.edges,
      pages: sport.pages.nodes,
    };
  } else {
    return undefined;
  }
}
