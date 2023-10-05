"use client";

import { useState } from "react";
import { APIEvent } from "../../graphql/types/event";
import "./events-calendar.scss";
import { POSTS_PER_PAGE } from "../../constants/constants";
import eventsUtils from "../../util/eventsUtils";
import EventsList from "../events-list/events-list";
import { Button } from "react-bootstrap";

type EventsCalendarProps = {
  allEvents: APIEvent[];
};

export default function EventsCalendar({ allEvents }: EventsCalendarProps) {
  const [events, setEvents] = useState<APIEvent[]>(
    allEvents.slice(0, POSTS_PER_PAGE)
  );

  const futureEvents = events.filter(eventsUtils.isFutureEvent);
  const pastEvents = events.filter(
    (event) => !eventsUtils.isFutureEvent(event)
  );

  const areAllEventsShown = () => {
    return events.length === allEvents.length;
  };

  const loadMore = () => {
    setEvents(
      events.concat(
        allEvents.slice(events.length, events.length + POSTS_PER_PAGE)
      )
    );
  };

  return (
    <div className="events-calendar">
      <h1>Kalendarz wydarzeń</h1>
      {futureEvents.length > 0 ? (
        <EventsList events={futureEvents} />
      ) : (
        <div>Brak nadchodzących wydarzeń</div>
      )}
      {pastEvents.length > 0 && (
        <div>
          <div>Minione wydarzenia</div>
          <EventsList events={pastEvents} />
        </div>
      )}
      {!areAllEventsShown() && (
        <Button onClick={loadMore}>Pokaż więcej wydarzeń</Button>
      )}
      {/* RELACJE Z WYDARZEŃ */}
    </div>
  );
}
