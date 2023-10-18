import EventMap from "../event-map/event-map";
import EventDetailsAddress from "./components/event-details-address/event-details-address";
import EventDetailsContent from "./components/event-details-content/event-details-content";
import EventDetailsPrice from "./components/event-details-price/event-details-price";
import EventDetailsTime from "./components/event-details-time/event-details-time";
import EventDetailsWebsite from "./components/event-details-website/event-details-website";
import "./event-details.scss";

type EventDetailsProps = {
  dateBegin: string;
  dateEnd?: string;
  address?: string;
  website?: string;
  price?: string;
  content?: string;
  lat: number;
  lng: number;
};

export default function EventDetails({
  dateBegin,
  dateEnd,
  address,
  website,
  price,
  content,
  lat,
  lng,
}: EventDetailsProps) {
  return (
    <main className="event-details">
      <div className="event-details__main">
        <EventDetailsTime dateBegin={dateBegin} dateEnd={dateEnd} />
        <EventDetailsAddress address={address} />
        <EventDetailsPrice price={price} />
        <EventDetailsWebsite website={website} />
        <EventDetailsContent content={content} />
      </div>
      <div className="event-details__map">
        <EventMap address={address} lat={lat} lng={lng} />
      </div>
    </main>
  );
}
