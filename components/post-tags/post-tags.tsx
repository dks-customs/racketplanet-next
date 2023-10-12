import Link from "next/link";
import { routes } from "../../constants/constants";
import "./post-tags.scss";

type PostTagsProps = {
  tags: {
    slug: string;
    name: string;
  }[];
};

export default function PostTags({ tags }: PostTagsProps) {
  if (tags.length > 0) {
    return (
      <div className="post-tags">
        <h5>Tagi</h5>
        <ul>
          {tags.map((tag) => (
            <li key={`post-tags-${tag.slug}`}>
              <Link href={`${routes.TAG}/${tag.slug}`} className="hoverable">
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
