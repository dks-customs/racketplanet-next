import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "../graphql-fragments/post-preview";
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
      haveNextPage: sport.posts.edges.length > POSTS_PER_PAGE,
      posts: sport.posts.edges.slice(0, POSTS_PER_PAGE),
      pages: sport.pages.nodes,
    };
  } else {
    return undefined;
  }
}
