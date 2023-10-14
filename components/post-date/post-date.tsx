import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl";
import "./post-date.scss";

TimeAgo.addDefaultLocale(pl);

type PostDateProps = {
  date: string;
  classic?: boolean;
};

export default function PostDate({ date, classic = false }: PostDateProps) {
  const jsDate = new Date(date);

  if (classic) {
    return (
      <div className="post-date">
        <time dateTime={jsDate.toDateString()}>
          {jsDate.getDate()}.{jsDate.getMonth()}.{jsDate.getFullYear()}
        </time>
      </div>
    );
  } else {
    const timeAgo = new TimeAgo("pl_PL");

    return (
      <div className="post-date">
        <time dateTime={jsDate.toDateString()}>{timeAgo.format(jsDate)}</time>
      </div>
    );
  }
}
