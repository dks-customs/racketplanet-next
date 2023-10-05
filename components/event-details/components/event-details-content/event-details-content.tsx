import "./event-details-content.scss";

export default function EventDetailsContent({ content }: { content?: string }) {
  if (content) {
    return (
      <div
        className="event-details-content"
        dangerouslySetInnerHTML={{ __html: "" }}
      >
        {content}
      </div>
    );
  } else {
    return null;
  }
}
