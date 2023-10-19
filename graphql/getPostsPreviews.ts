import { POSTS_PER_PAGE } from "../constants/constants";
import { postPreviewFragment } from "./fragments/post-preview";
import fetchApi from "../util/fetchApi";
import { APIPostPreview } from "./types/post-preview";
import filterHiddenPosts from "../util/filterHiddenPosts";

type PostsPreviewsAPIData = {
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

export default async function getPostsPreviews(
  afterCursor: string = "",
  searchQuery: string = ""
) {
  const data = await fetchApi<PostsPreviewsAPIData | undefined>(
    `
      query PostPreviews {
        posts(first: ${POSTS_PER_PAGE}, where: { orderby: { field: DATE, order: DESC }, search: "${searchQuery}" }, after: "${afterCursor}") {
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
      }
    `
  );

  if (data?.posts) {
    const posts = data.posts.edges.filter(filterHiddenPosts);

    if (posts.length > 0) {
      return {
        hasNextPage: data.posts.pageInfo.hasNextPage,
        endCursor: data.posts.pageInfo.endCursor,
        items: posts,
      };
    }
  }

  return undefined;
}
