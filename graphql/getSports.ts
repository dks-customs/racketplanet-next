import fetchApi from "../util/fetchApi";
import { APISports } from "./types/sports";

type SportsAPIData = {
  sports: {
    nodes: APISports;
  };
};

export default async function getSports(): Promise<APISports> {
  const data = await fetchApi<SportsAPIData | undefined>(
    `
      query Sports {
        sports(first: 100) {
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
