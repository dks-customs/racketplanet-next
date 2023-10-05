import EventsList from "../../components/events-list/events-list";
import { routes } from "../../constants/constants";
import getEvents from "../../graphql/getEvents";
import eventsUtils from "../../util/eventsUtils";
import pageMetadata from "../../util/pageMetadata";
import "./events.scss";

export default async function Events() {
  const events = await getEvents();
  const futureEvents = events.filter(eventsUtils.isFutureEvent);
  const pastEvents = events.filter(
    (event) => !eventsUtils.isFutureEvent(event)
  );

  return (
    <main className="events layout-container">
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
      {/* RELACJE Z WYDARZEŃ */}
    </main>
  );
}

export const metadata = pageMetadata({
  url: routes.EVENTS,
  titleFollowUp: "Wydarzenia",
  description: "Kalendarz rakietowych imprez sportowych",
  twitterCard: "summary",
  imageUrl: `/images/logo-sygnet.jpg`,
  imageAlt: "Racket Planet Logo",
});
