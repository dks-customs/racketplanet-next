import { APIEvent } from "../../../../graphql/types/event";
import stripHtmlTags from "../../../../util/stripHtmlTags";
import PostSports from "../../../post-sports/post-sports";
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
        {sports.length > 0 && (
          <div className="list-event-header__main__sports">
            <PostSports sports={sports} links={false} />
          </div>
        )}
        <h2 className="list-event-header__main__title">
          {stripHtmlTags(title, false)}
        </h2>
        {city && <div className="list-event-header__main__city">{city}</div>}
      </div>
    </header>
  );
}
