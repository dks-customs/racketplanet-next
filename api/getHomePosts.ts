import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "../graphql-fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APIPostPreview } from "./types/post-preview";

type HomePostsAPIData = {
  posts: {
    edges: {
      node: APIPostPreview;
    }[];
  };
};

export default async function getHomePosts() {
  const data = await fetchApi<HomePostsAPIData>(
    `
      query HomePosts {
        posts(first: ${POSTS_PER_PAGE}, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            ${postPreviewFragment}
          }
        }
      }
    `
  );

  return data?.posts.edges.map((edge) => edge.node);
}
