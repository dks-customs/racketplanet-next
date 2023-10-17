import { APIEvent } from "../graphql/types/event";
import specDateString from "./specDateString";

export const MONTHS = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];

export const MONTHS_FULL = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const isFutureEvent = (event: APIEvent) => {
  const now = new Date();
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );

  const nowPoland = new Date(nowUTC + 3600000);
  const begin = new Date(specDateString(event.eventAcf.dateBegin));
  const end =
    event.eventAcf.dateEnd && new Date(specDateString(event.eventAcf.dateEnd));

  const dayDate = (date) => {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  };

  if (end) {
    return end > nowPoland || dayDate(end) === dayDate(nowPoland);
  } else {
    return begin > nowPoland || dayDate(begin) === dayDate(nowPoland);
  }
};

const sortByDate = (a: APIEvent, b: APIEvent) => {
  const aBeginTime = new Date(specDateString(a.eventAcf.dateBegin)).getTime();
  const bBeginTime = new Date(specDateString(b.eventAcf.dateBegin)).getTime();

  return bBeginTime - aBeginTime;
};

const formattedDate = (date: string, detailed = true, fullMonth = true) => {
  const jsDate = new Date(specDateString(date));

  const day = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();
  const hours = jsDate.getHours();
  const minutes = jsDate.getMinutes();

  const monthPart = fullMonth ? MONTHS_FULL[month] : MONTHS[month];
  const detailedPart = detailed
    ? `, ${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`
    : "";

  const dateString = `${day} ${monthPart} ${year}${detailedPart}`;

  return dateString;
};

const eventsUtils = {
  formattedDate,
  isFutureEvent,
  sortByDate,
};

export default eventsUtils;
