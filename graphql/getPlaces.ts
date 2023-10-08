import fetchApi from "../util/fetchApi";
import { APIPlace } from "./types/place";

type PlacesAPIData = {
  places: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: {
      node: APIPlace;
    }[];
  };
};

export default async function getPlaces(): Promise<APIPlace[]> {
  let nextPage: boolean = true;
  let endCursor: string = "";
  let places: APIPlace[] = [];

  do {
    const data = await fetchApi<PlacesAPIData | undefined>(
      `
      query Places {
        places(first: 100, after: "${endCursor}") {
          edges {
            node {
              placeId
              placeAcfOsm {
                lat
                lng
                address
              }
              placeAcf {
                name
                description
                webpage
              }
              sports {
                nodes {
                  name
                  slug
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
    );

    if (data) {
      nextPage = data.places.pageInfo.hasNextPage;
      endCursor = data.places.pageInfo.endCursor;
      places = places.concat(data.places.edges.map((edge) => edge.node));
    }
  } while (nextPage);

  return places;
}
