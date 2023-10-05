import EventMap from "../event-map/event-map";
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
        {dateBegin && <p className="event-details__main__time"></p>}
        {address && <p className="event-details__main__address">{address}</p>}
        {website && (
          <p className="event-details__main__website">
            <a href={website} target="_blank">
              Strona internetowa&nbsp;&rarr;
            </a>
          </p>
        )}
        {price && price !== "-" && (
          <p className="event-details__main__price">{price}</p>
        )}
        {content && (
          <div
            className="event-details__main__content"
            dangerouslySetInnerHTML={{ __html: "" }}
          >
            {content}
          </div>
        )}
      </div>
      <div className="event-details__map">
        <EventMap address={address} lat={lat} lng={lng} />
      </div>
    </main>
  );
}
