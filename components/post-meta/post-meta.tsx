import Link from "next/link";
import { routes } from "../../constants/constants";
import TimeAgo from "javascript-time-ago";
import "./post-meta.scss";

type PostMetaProps = {
  sports?: {
    slug: string;
    name: string;
  }[];
  categories?: {
    slug: string;
    name: string;
    children: {
      nodes: {
        slug: string;
        name: string;
      }[];
    };
  }[];
  date: string;
};

export default function PostMeta({ sports, categories, date }: PostMetaProps) {
  let category = categories?.length === 1 ? categories[0] : null;
  let childCategory =
    category?.children.nodes.length === 1 ? category?.children.nodes[0] : false;
  const sport = sports?.length === 1 ? sports[0] : null;
  const jsDate = new Date(date);
  const timeAgo = new TimeAgo("pl_PL");

  return (
    <div className="post-meta">
      {category && !childCategory && (
        <div className="post-meta__item">
          <Link href={`${routes.CATEGORY}/${category.slug}`}>
            {category.name}
          </Link>
        </div>
      )}
      {childCategory && (
        <div className="post-meta__item">
          <Link href={`${routes.CATEGORY}/${childCategory.slug}`}>
            {childCategory.name}
          </Link>
        </div>
      )}
      {sport && (
        <div className="post-meta__item">
          <Link href={`${routes.SPORT}/${sport.slug}`}>{sport.name}</Link>
        </div>
      )}
      {date && (
        <div className="post-meta__item">
          <time dateTime={jsDate.toDateString()}>{timeAgo.format(jsDate)}</time>
        </div>
      )}
    </div>
  );
}
