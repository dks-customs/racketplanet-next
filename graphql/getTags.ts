import fetchApi from "../util/fetchApi";
import { APITags } from "./types/tags";

type TagsAPIData = {
  tags: {
    nodes: APITags;
  };
};

export default async function getCategories(): Promise<APITags> {
  const data = await fetchApi<TagsAPIData>(
    `
      query Categories {
        categories(first: 100) {
          nodes {
            id
            name
            slug
          }
        }
      }
    `
  );

  if (data?.tags?.nodes) {
    return data.tags.nodes;
  }

  return [];
}
