import { Metadata } from "next";
import getEvent from "../../../../graphql/getEvent";
import getEvents from "../../../../graphql/getEvents";
import NotFound from "../../../not-found";
import notFoundMetadata from "../../../../util/notFoundMetadata";
import pageMetadata from "../../../../util/pageMetadata";
import Link from "next/link";
import { routes } from "../../../../constants/constants";
import EventDetails from "../../../../components/event-details/event-details";
import getMoreCategoryPosts from "../../../../graphql/getMoreCategoryPosts";
import PostsGrid from "../../../../components/posts-grid/posts-grid";

type EventProps = {
  params: {
    pid: string;
    slug: string;
  };
};

export default async function Event({ params }: EventProps) {
  const event = await getEvent(params.pid);
  const relations = await getMoreCategoryPosts("relacje");

  if (event && event.slug === params.slug) {
    return (
      <main className="event layout-container">
        <Link href={`${routes.EVENTS}`}>&larr;&nbsp;Wszystkie wydarzenia</Link>
        <h1>{event.eventAcf.name}</h1>
        <div className="event-details">
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
        {relations && relations.length > 0 && (
          <section>
            <div>Relacje z wydarzeń</div>
            <PostsGrid posts={relations} />
          </section>
        )}
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const events = await getEvents();

  return events.map((event) => ({
    pid: event.eventId.toString(),
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventProps): Promise<Metadata> {
  const event = await getEvent(params.pid);
  const url = `${params.pid}/${params.slug}`;

  if (event && event.slug === params.slug) {
    return pageMetadata({
      url,
      titleFollowUp: event.eventAcf.name,
      twitterCard: "summary",
      description: event.content || "",
      ogType: "article",
    });
  } else {
    return notFoundMetadata(url);
  }
}
