import "./event-details-website.scss";

export default function EventDetailsWebsite({ website }: { website?: string }) {
  if (website) {
    return (
      <p className="event-details-website">
        <a href={website} target="_blank">
          Strona internetowa&nbsp;&rarr;
        </a>
      </p>
    );
  } else {
    return null;
  }
}
