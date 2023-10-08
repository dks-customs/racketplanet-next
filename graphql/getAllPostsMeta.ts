import fetchApi from "../util/fetchApi";
import { PostMeta } from "./types/post-meta";

type PostsMetaAPIData = {
  posts: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: {
      node: PostMeta;
    }[];
  };
};

export default async function getAllPostsMeta() {
  let nextPage: boolean = true;
  let endCursor: string = "";
  let posts: PostMeta[] = [];

  do {
    const data = await fetchApi<PostsMetaAPIData | undefined>(
      `
      query PostsMeta {
        posts(first: 100, where: { orderby: { field: DATE, order: DESC } }, after: "${endCursor}") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              postId
              slug
              uri
              modified
            }
          }
        }
      }
    `
    );

    if (data) {
      nextPage = data.posts.pageInfo.hasNextPage;
      endCursor = data.posts.pageInfo.endCursor;
      posts = posts.concat(data.posts.edges.map((edge) => edge.node));
    }
  } while (nextPage);

  return posts;
}
