import { routes } from "../../constants/constants";
import getEvents from "../../graphql/getEvents";
import pageMetadata from "../../util/pageMetadata";
import "./events.scss";
import EventsCalendar from "../../components/events-calendar/events-calendar";
import getMoreCategoryPosts from "../../graphql/getMoreCategoryPosts";
import PostsGrid from "../../components/posts-grid/posts-grid";

export default async function Events() {
  const allEvents = await getEvents();
  const relations = await getMoreCategoryPosts("relacje");

  return (
    <main className="events layout-container">
      <EventsCalendar allEvents={allEvents} />
      {relations && relations.length > 0 && (
        <section>
          <div>Relacje z wydarzeń</div>
          <PostsGrid posts={relations} />
        </section>
      )}
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
