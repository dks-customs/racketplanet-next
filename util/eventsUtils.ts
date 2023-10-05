import { APIEvent } from "../graphql/types/event";
import specDateString from "./specDateString";

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
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear}`;
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

const eventsUtils = {
  isFutureEvent,
  sortByDate,
};

export default eventsUtils;
