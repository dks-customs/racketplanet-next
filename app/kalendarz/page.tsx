import { routes } from "../../constants/constants";
import getEvents from "../../graphql/getEvents";
import pageMetadata from "../../util/pageMetadata";
import "./events.scss";
import EventsCalendar from "../../components/events-calendar/events-calendar";

export default async function Events() {
  const allEvents = await getEvents();

  return (
    <main className="events">
      <EventsCalendar allEvents={allEvents} />
    </main>
  );
}

export const metadata = pageMetadata({
  url: routes.EVENTS,
  titleFollowUp: "Kalendarz",
  description: "Kalendarz rakietowych imprez sportowych",
  twitterCard: "summary",
  imageUrl: `/images/logo-sygnet.jpg`,
  imageAlt: "Racket Planet Logo",
});
