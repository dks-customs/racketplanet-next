import Link from "next/link";
import { routes } from "../../constants/constants";
import authorSlug from "../../util/authorSlug";
import "./post-author.scss";

type PostAuthorProps = {
  name: string;
  id: number;
};

export default function PostAuthor({ name, id }: PostAuthorProps) {
  return (
    <div className="post-author">
      <Link href={`${routes.TEAM}/${id}/${authorSlug(name)}`}>{name}</Link>
    </div>
  );
}
