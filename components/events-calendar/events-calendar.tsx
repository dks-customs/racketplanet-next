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
  const futureEvents = allEvents.filter(eventsUtils.isFutureEvent);
  const pastEvents = allEvents.filter(
    (event) => !eventsUtils.isFutureEvent(event)
  );

  return (
    <div className="events-calendar layout-container">
      <h1 className="events-calendar__title">Kalendarz</h1>
      {futureEvents.length > 0 ? (
        <div className="events-calendar__events">
          <div className="events-calendar__events__title">
            Nadchodzące wydarzenia
          </div>
          <EventsList events={futureEvents} />
        </div>
      ) : (
        <div className="events-calendar__no-events">
          Brak nadchodzących wydarzeń
        </div>
      )}
      {pastEvents.length > 0 && (
        <div className="events-calendar__events">
          <div className="events-calendar__events__title">
            Minione wydarzenia
          </div>
          <EventsList events={pastEvents} past />
        </div>
      )}
    </div>
  );
}
