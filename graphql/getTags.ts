import fetchApi from "../util/fetchApi";
import { APITag } from "./types/tags";

type TagsAPIData = {
  tags: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: {
      node: {
        id: string;
        name: string;
        slug: string;
      };
    }[];
  };
};

export default async function getTags(): Promise<APITag[]> {
  let nextPage: boolean = true;
  let endCursor: string = "";
  let tags: APITag[] = [];

  do {
    const data = await fetchApi<TagsAPIData | undefined>(
      `
      query Tags {
        tags(first: 100, after: "${endCursor}") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `
    );

    if (data) {
      nextPage = data.tags.pageInfo.hasNextPage;
      endCursor = data.tags.pageInfo.endCursor;
      tags = tags.concat(data.tags.edges.map((edge) => edge.node));
    }
  } while (nextPage);

  return tags;
}
