import events from "../util/events";
import fetchApi from "../util/fetchApi";
import { Events } from "./types/events";

type EventsApiData = {
  events: {
    nodes: Events;
  };
};

export default async function getEvents(): Promise<Events> {
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
