import "./last-modified.scss";

type LastModifiedProps = {
  date: string;
};

export default function LastModified({ date }: LastModifiedProps) {
  const jsDate = new Date(date);
  const day = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return (
    <p className="last-modified">
      Ostatnia zmiana:{" "}
      <time dateTime={date}>
        {day}.{month}.{year}
      </time>
    </p>
  );
}
