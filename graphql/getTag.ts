import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APITag } from "./types/tag";

type TagAPIData = {
  tags: {
    nodes: APITag[];
  };
};

export default async function getTag(slug: string, after: string = "") {
  const data = await fetchApi<TagAPIData>(
    `
      query Tag {
        tags(first: 1, where: {slug: "${slug}"}) {
          nodes {
            name
            tagId
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

  const tag = data.tags.nodes[0];

  if (tag) {
    return {
      name: tag.name,
      hasNextPage: tag.posts.pageInfo.hasNextPage,
      endCursor: tag.posts.pageInfo.endCursor,
      posts: tag.posts.edges.slice(0, POSTS_PER_PAGE),
    };
  } else {
    return undefined;
  }
}
