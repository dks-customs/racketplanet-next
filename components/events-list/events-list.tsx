import { useState } from "react";
import { POSTS_PER_PAGE } from "../../constants/constants";
import { APIEvent } from "../../graphql/types/event";
import ListEvent from "../list-event/list-event";
import "./events-list.scss";
import { Button } from "react-bootstrap";

type EventsListProps = {
  events: APIEvent[];
  past?: boolean;
};

export default function EventsList({ events, past = false }: EventsListProps) {
  const [shownEvents, setShownEvents] = useState<APIEvent[]>(
    events.slice(0, POSTS_PER_PAGE)
  );

  const areAllEventsShown = () => {
    return shownEvents.length === events.length;
  };

  const loadMore = () => {
    setShownEvents(
      events.concat(events.slice(events.length, events.length + POSTS_PER_PAGE))
    );
  };

  if (events.length > 0) {
    return (
      <div className="events-list-container">
        <ul className="events-list">
          {shownEvents.map((event) => (
            <ListEvent
              event={event}
              key={`list-event-${event.eventId}`}
              past={past}
            />
          ))}
        </ul>
        {!areAllEventsShown() && (
          <div className="more-events-btn-container">
            <Button
              variant="secondary"
              onClick={loadMore}
              className="more-events-btn"
            >
              Pokaż więcej wydarzeń
            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
