import specDateString from "../../../../../../util/specDateString";
import "./list-event-date.scss";

const WEEKDAYS = ["pon", "wt", "śr", "czw", "pt", "sob", "nd"];
const MONTHS = [
  "sty",
  "lu",
  "mar",
  "kwi",
  "maj",
  "czer",
  "lip",
  "sie",
  "wrz",
  "paź",
  "lis",
  "gru",
];

type ListEventDateProps = {
  dateBegin: string;
};

export default function ListEventDate({ dateBegin }: ListEventDateProps) {
  const date = new Date(specDateString(dateBegin));
  const day = date.getDate();
  const weekday = date.getDay();
  const month = date.getMonth();

  return (
    <div className="list-event-date">
      <div className="list-event-date__weekday">
        {WEEKDAYS[weekday === 0 ? 6 : weekday - 1]}
      </div>
      <div className="list-event-date__day">
        <span className="list-event-date__day__number">{day}</span>
        <span className="list-event-date__day__month">{MONTHS[month]}</span>
      </div>
    </div>
  );
}
