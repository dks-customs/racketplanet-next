import { Events } from "../../api/types/events";
import "./events-widget.scss";

type EventsWidgetProps = {
  events: Events;
};

export default function EventsWidget({ events }: EventsWidgetProps) {
  if (events.length > 0) {
    return <div>Events Widget</div>;
  } else {
    return null;
  }
}
