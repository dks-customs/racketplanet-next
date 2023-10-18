import eventsUtils from "../../../../util/eventsUtils";
import "./event-details-time.scss";

type EventDetailsTimeProps = {
  dateBegin: string;
  dateEnd?: string;
};

export default function EventDetailsTime({
  dateBegin,
  dateEnd,
}: EventDetailsTimeProps) {
  if (dateBegin) {
    return (
      <p className="event-details-time">
        Data:&nbsp;
        <time className="event-details-time__begin" dateTime={dateBegin}>
          {eventsUtils.formattedDate(dateBegin, false, true)}
        </time>
        {dateEnd && dateEnd !== dateBegin && (
          <>
            &nbsp;-&nbsp;
            <time className="event-details-time__end" dateTime={dateEnd}>
              {eventsUtils.formattedDate(dateEnd, false, true)}
            </time>
          </>
        )}
      </p>
    );
  } else {
    return null;
  }
}
