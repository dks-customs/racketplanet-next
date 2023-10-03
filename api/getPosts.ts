import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "../graphql-fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APIPostPreview } from "./types/post-preview";

type HomePostsAPIData = {
  posts: {
    edges: {
      cursor: string;
      node: APIPostPreview;
    }[];
  };
};

export default async function getHomePosts(afterCursor: string = "") {
  const data = await fetchApi<HomePostsAPIData>(
    `
      query Posts {
        posts(first: ${
          POSTS_PER_PAGE + 1
        }, where: { orderby: { field: DATE, order: DESC } }, after: "${afterCursor}") {
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
    haveNextPage: data.posts.edges.length > POSTS_PER_PAGE,
    items: data.posts.edges.slice(0, POSTS_PER_PAGE),
  };
}
