import eventsUtils from "../util/eventsUtils";
import fetchApi from "../util/fetchApi";
import { APIEvent } from "./types/event";

type EventsAPIData = {
  events: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: {
      node: APIEvent;
    }[];
  };
};

export default async function getEvents(): Promise<APIEvent[]> {
  let nextPage: boolean = true;
  let endCursor: string = "";
  let posts: APIEvent[] = [];

  do {
    const data = await fetchApi<EventsAPIData>(
      `
      query Events {
        events(first: 100, after: "${endCursor}") {
          edges {
            node {
              sports {
                nodes {
                  name
                  slug
                  id
                }
              }
              eventAcfOsm {
                address
                lat
                lng
              }
              eventAcf {
                dateBegin
                dateEnd
                eventCity
                name
                price
                webpage
              }
              slug
              title
              content
              eventId
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

    nextPage = data.events.pageInfo.hasNextPage;
    endCursor = data.events.pageInfo.endCursor;
    posts = posts.concat(data.events.edges.map((edge) => edge.node));
  } while (nextPage);

  return posts.sort(eventsUtils.sortByDate);
}
