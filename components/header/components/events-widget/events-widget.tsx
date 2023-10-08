import { APIEvent } from "../../../../graphql/types/event";
import "./events-widget.scss";

type EventsWidgetProps = {
  events: APIEvent[];
};

export default function EventsWidget({ events }: EventsWidgetProps) {
  if (events.length > 0) {
    return <div>Events Widget</div>;
  } else {
    return null;
  }
}
