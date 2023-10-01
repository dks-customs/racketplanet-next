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
            pages {
              nodes {
                id
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
