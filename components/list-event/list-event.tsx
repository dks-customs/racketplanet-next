import { Collapse } from "react-bootstrap";
import { APIEvent } from "../../graphql/types/event";
import { useState } from "react";
import ListEventHeader from "./components/list-event-header/list-event-header";
import EventDetails from "../event-details/event-details";
import "./list-event.scss";

type ListEventProps = {
  event: APIEvent;
};

export default function ListEvent({ event }: ListEventProps) {
  const [open, setOpen] = useState(false);

  return (
    <li className="list-event">
      <article>
        <button
          onClick={() => setOpen(!open)}
          aria-controls={`collapse-event-${event.eventId}`}
          aria-expanded={open}
        >
          <ListEventHeader
            title={event.title}
            sports={event.sports.nodes}
            dateBegin={event.eventAcf.dateBegin}
            city={event.eventAcf.eventCity}
          />
        </button>
        <Collapse in={open}>
          <div id={`collapse-event-${event.eventId}`}>
            <EventDetails
              dateBegin={event.eventAcf.dateBegin}
              dateEnd={event.eventAcf.dateEnd}
              address={event.eventAcfOsm.address}
              website={event.eventAcf.webpage}
              price={event.eventAcf.price}
              content={event.content}
              lat={event.eventAcfOsm.lat}
              lng={event.eventAcfOsm.lng}
            />
          </div>
        </Collapse>
      </article>
    </li>
  );
}
