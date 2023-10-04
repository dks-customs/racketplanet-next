import Link from "next/link";
import "./post-sports.scss";
import { routes } from "../../constants/constants";

type PostSportsProps = {
  sports: {
    slug: string;
    name: string;
  }[];
};

export default function PostSports({ sports }: PostSportsProps) {
  if (sports.length > 0) {
    return (
      <ul className="post-sports">
        {sports.map((sport) => (
          <li key={`post-sports-${sport.slug}`}>
            <Link href={`${routes.SPORT}/${sport.slug}`}>{sport.name}</Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
