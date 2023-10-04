import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APIPostPreview } from "./types/post-preview";

type PostsAPIData = {
  posts: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: {
      node: APIPostPreview;
    }[];
  };
};

export default async function getPosts(afterCursor: string = "") {
  const data = await fetchApi<PostsAPIData>(
    `
      query Posts {
        posts(first: ${POSTS_PER_PAGE}, where: { orderby: { field: DATE, order: DESC } }, after: "${afterCursor}") {
          edges {
            cursor
            node {
              ${postPreviewFragment}
            }
          }
        }
      }
    `
  );

  return {
    hasNextPage: data.posts.pageInfo.hasNextPage,
    endCursor: data.posts.pageInfo.endCursor,
    items: data.posts.edges.slice(0, POSTS_PER_PAGE),
  };
}
