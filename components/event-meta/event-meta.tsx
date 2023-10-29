import Link from "next/link";
import { routes } from "../../constants/constants";

type EventMetaProps = {
  sports?: {
    slug: string;
    name: string;
  }[];
  city?: string;
};

export default function EventMeta({ sports, city }: EventMetaProps) {
  const sport = sports?.length === 1 ? sports[0] : false;

  if (sport || city) {
    return (
      <div className="post-meta">
        {sport && (
          <div className="post-meta__item">
            <Link href={`${routes.SPORT}/${sport.slug}`}>{sport.name}</Link>
          </div>
        )}
        {city && <div className="post-meta__item">{city}</div>}
      </div>
    );
  } else {
    return null;
  }
}
