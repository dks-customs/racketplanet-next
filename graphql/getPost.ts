import fetchApi from "../util/fetchApi";
import { featuredImageFragment } from "./fragments/featured-image";
import { PostAPI } from "./types/post";

type PostAPIData = {
  post: PostAPI;
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
    }
  `
  );

  if (data?.post) {
    return data.post;
  } else {
    return undefined;
  }
}
