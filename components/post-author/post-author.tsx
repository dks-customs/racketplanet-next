import Link from "next/link";
import { routes } from "../../constants/constants";
import authorSlug from "../../util/authorSlug";
import "./post-author.scss";

type PostAuthorProps = {
  name: string;
  id: number;
  avatarUrl: string;
};

export default function PostAuthor({ name, id, avatarUrl }: PostAuthorProps) {
  return (
    <Link
      href={`${routes.TEAM}/${id}/${authorSlug(name)}`}
      className="post-author"
    >
      <img src={avatarUrl} />
      <span>{name}</span>
    </Link>
  );
}
