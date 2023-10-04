import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl";
import "./post-date.scss";

TimeAgo.addDefaultLocale(pl);

type PostDateProps = {
  date: string;
};

export default function PostDate({ date }: PostDateProps) {
  const timeAgo = new TimeAgo("pl_PL");

  return (
    <div className="post-date">
      <time>{timeAgo.format(new Date(date))}</time>
    </div>
  );
}
