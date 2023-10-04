import Link from "next/link";
import { routes } from "../../constants/constants";

type PostAuthorProps = {
  name: string;
  slug: string;
};

export default function PostAuthor({ name, slug }: PostAuthorProps) {
  return (
    <div className="post-author">
      <Link href={`${routes.TEAM}/${slug}`}>{name}</Link>
    </div>
  );
}
