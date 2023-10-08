import fetchApi from "../util/fetchApi";
import { featuredImageFragment } from "./fragments/featured-image";
import { postPreviewFragment } from "./fragments/post-preview";
import { PostAPI } from "./types/post";
import { APIPostPreview } from "./types/post-preview";

type PostAPIData = {
  post: PostAPI;
  posts: {
    nodes: APIPostPreview[];
  };
};

export default async function getPost(wpId: string) {
  const data = await fetchApi<PostAPIData | undefined>(
    `
    query Post {
      post(id: "${wpId}", idType: DATABASE_ID) {
        id
        databaseId
        isSticky
        slug
        title
        date
        excerpt
        content
        ${featuredImageFragment}
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            name
            slug
            children {
              nodes {
                slug 
                name
              }
            }
          }
        }
        sports {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
      }
      posts(first: 3, where: { notIn: "${wpId}", orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${postPreviewFragment}
        }
      }
    }
  `
  );

  if (data?.post) {
    return {
      ...data.post,
      morePosts: data.posts.nodes,
    };
  } else {
    return undefined;
  }
}
