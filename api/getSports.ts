import fetchApi from "../util/fetchApi";
import { Sports } from "./types/sports";

type SportsApiData = {
  sports: {
    nodes: Sports;
  };
};

export default async function getSports(): Promise<Sports> {
  const data = await fetchApi<SportsApiData>(
    `
      query Sports {
        sports {
          nodes {
            id
            slug
            name
            pages {
              nodes {
                id
                slug
                ustawieniaStrony {
                  typStrony
                }
              }
            }
          }
        }
      }
    `
  );

  if (data?.sports?.nodes) {
    return data.sports.nodes;
  }

  return [];
}
