import { POSTS_PER_PAGE } from "../constants/constants";
import fetchApi from "../util/fetchApi";
import { postPreviewFragment } from "./fragments/post-preview";
import { APIAuthor } from "./types/author";

type AuthorAPIData = {
  user: APIAuthor;
};

export default async function getAuthor(wpId: string, after: string = "") {
  const data = await fetchApi<AuthorAPIData | undefined>(
    `
    query Author {
      user(id: "${wpId}", idType: DATABASE_ID) {
        databaseId
        name
        description
        avatar {
          url
        }
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
  `
  );

  const author = data?.user;

  if (author) {
    return {
      name: author.name,
      description: author.description,
      avatarUrl: author.avatar.url,
      hasNextPage: author.posts.pageInfo.hasNextPage,
      endCursor: author.posts.pageInfo.endCursor,
      posts: author.posts.edges.slice(0, POSTS_PER_PAGE),
    };
  } else {
    return undefined;
  }
}
