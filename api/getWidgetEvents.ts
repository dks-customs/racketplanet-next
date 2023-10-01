import events from "../util/events";
import fetchApi from "../util/fetchApi";
import { APIEvents } from "./types/events";

type EventsApiData = {
  events: {
    nodes: APIEvents;
  };
};

export default async function getEvents(): Promise<APIEvents> {
  const data = await fetchApi<EventsApiData>(
    `
      query Events {
        events {
          nodes {
            id
						slug
						eventAcf {
							name
							dateBegin
							dateEnd
							eventCity
						}
						sports {
							nodes {
								id
								name
								slug
							}
						}
          }
        }
      }
    `
  );

  if (data?.events?.nodes) {
    return data.events.nodes
      .filter(events.isFutureEvent)
      .sort(events.sortByDate)
      .slice(0, 3);
  }

  return [];
}