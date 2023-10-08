import fetchApi from "../util/fetchApi";
import { eventFragment } from "./fragments/event";
import { postPreviewFragment } from "./fragments/post-preview";
import { APIEvent } from "./types/event";
import { APIPostPreview } from "./types/post-preview";

type EventsAPIData = {
  event: APIEvent;
  posts: {
    nodes: APIPostPreview[];
  };
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
