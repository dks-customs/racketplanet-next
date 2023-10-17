import Link from "next/link";
import "./post-sports.scss";
import { routes } from "../../constants/constants";

type PostSportsProps = {
  links?: boolean;
  sports: {
    slug: string;
    name: string;
  }[];
};

export default function PostSports({ sports, links = true }: PostSportsProps) {
  if (sports.length > 0) {
    return (
      <ul className="post-sports">
        {sports.map((sport) => (
          <li key={`post-sports-${sport.slug}`}>
            {links && (
              <Link href={`${routes.SPORT}/${sport.slug}`}>{sport.name}</Link>
            )}
            {!links && <span>{sport.name}</span>}
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
