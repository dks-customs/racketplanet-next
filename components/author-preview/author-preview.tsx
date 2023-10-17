import Link from "next/link";
import { routes } from "../../constants/constants";
import "./author-preview.scss";
import authorSlug from "../../util/authorSlug";

type AuthorPreviewProps = {
  name: string;
  avatarUrl: string;
  id: number;
};

export default function AuthorPreview({
  name,
  avatarUrl,
  id,
}: AuthorPreviewProps) {
  return (
    <Link href={`${routes.TEAM}/${id}/${authorSlug(name)}`}>
      <img src={avatarUrl} />
      <h4>{name}</h4>
    </Link>
  );
}
