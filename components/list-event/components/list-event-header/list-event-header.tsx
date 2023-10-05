import { APIEvent } from "../../../../graphql/types/event";
import PostSports from "../../../post-sports/post-sports";
import ListEventDate from "./components/list-event-date/list-event-date";

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
        <h2>{title}</h2>
        <PostSports sports={sports} />
      </div>
      {city && <div className="list-event-header__city">{city}</div>}
    </header>
  );
}
