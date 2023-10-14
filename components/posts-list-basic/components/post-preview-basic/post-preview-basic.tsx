import Link from "next/link";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import PostSports from "../../../post-sports/post-sports";
import PostCategories from "../../../post-categories/post-categories";
import PostDate from "../../../post-date/post-date";
import "./post-preview-basic.scss";

type PostPreviewBasicProps = {
  post: APIPostPreview;
};

export default function PostPreviewBasic({ post }: PostPreviewBasicProps) {
  return (
    <article className="post-preview-basic">
      <div className="post-preview-basic__date">
        <PostDate date={post.date} classic />
      </div>
      <h2 className="post-preview-basic__title">
        <Link href={`/${post.databaseId}/${post.slug}`} className="hoverable">
          {post.title}
        </Link>
      </h2>
    </article>
  );
}
