import fetchApi from "../util/fetchApi";
import { APISports } from "./types/sports";

type SportsApiData = {
  sports: {
    nodes: APISports;
  };
};

export default async function getSports(): Promise<APISports> {
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
