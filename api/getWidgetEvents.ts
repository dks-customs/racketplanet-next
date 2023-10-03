import events from "../util/events";
import fetchApi from "../util/fetchApi";
import { APIEvents } from "./types/events";

type EventsAPIData = {
  events: {
    nodes: APIEvents;
  };
};

export default async function getEvents(): Promise<APIEvents> {
  const data = await fetchApi<EventsAPIData>(
    `
      query Events {
        events(first: 100) {
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
