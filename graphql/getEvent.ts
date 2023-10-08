import fetchApi from "../util/fetchApi";
import { eventFragment } from "./fragments/event";
import { APIEvent } from "./types/event";

type EventsAPIData = {
  event: APIEvent;
};

export default async function getEvent(
  eventId: string
): Promise<APIEvent | undefined> {
  const data = await fetchApi<EventsAPIData | undefined>(
    `
      query Event {
        event(id: "${eventId}", idType: DATABASE_ID ) {
          ${eventFragment}
        }
      }
    `
  );

  if (data) {
    return data.event;
  } else {
    return undefined;
  }
}
