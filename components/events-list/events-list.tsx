import { APIEvent } from "../../graphql/types/event";
import ListEvent from "../list-event/list-event";
import "./events-list.scss";

type EventsListProps = {
  events: APIEvent[];
};

export default function EventsList({ events }: EventsListProps) {
  if (events.length > 0) {
    return (
      <ul className="events-list">
        {events.map((event) => (
          <ListEvent event={event} key={`list-event-${event.eventId}`} />
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
