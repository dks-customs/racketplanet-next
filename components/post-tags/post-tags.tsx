import Link from "next/link";
import "./post-tags.scss";
import { routes } from "../../constants/constants";

type PostTagsProps = {
  tags: {
    slug: string;
    name: string;
  }[];
};

export default function PostTags({ tags }: PostTagsProps) {
  if (tags.length > 0) {
    return (
      <ul className="post-tags">
        {tags.map((tag) => (
          <li key={`post-tags-${tag.slug}`}>
            <Link href={`${routes.TAG}/${tag.slug}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
