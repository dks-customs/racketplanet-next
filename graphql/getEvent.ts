import fetchApi from "../util/fetchApi";
import { eventFragment } from "./fragments/event";
import { APIEvent } from "./types/event";

type EventsAPIData = {
  event: APIEvent;
};

export default async function getEvent(eventId: string): Promise<APIEvent> {
  const data = await fetchApi<EventsAPIData>(
    `
      query Event {
        event(id: "${eventId}", idType: DATABASE_ID ) {
          ${eventFragment}
        }
      }
    `
  );

  return data.event;
}
