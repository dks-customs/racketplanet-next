import { APIEvent } from "../../../../graphql/types/event";
import stripHtmlTags from "../../../../util/stripHtmlTags";
import EventMeta from "../../../event-meta/event-meta";
import ListEventDate from "./components/list-event-date/list-event-date";
import "./list-event-header.scss";

type ListEventHeaderProps = {
  dateBegin: string;
  title: string;
  sports: APIEvent["sports"]["nodes"];
  city: string;
};

export default function ListEventHeader({
  dateBegin,
  title,
  sports,
  city,
}: ListEventHeaderProps) {
  return (
    <header className="list-event-header">
      <ListEventDate dateBegin={dateBegin} />
      <div className="list-event-header__main">
        <h2 className="list-event-header__main__title">
          {stripHtmlTags(title, false)}
        </h2>
        <EventMeta city={city} sports={sports} />
      </div>
    </header>
  );
}
