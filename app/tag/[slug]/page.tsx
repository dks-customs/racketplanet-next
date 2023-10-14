import Link from "next/link";
import { routes } from "../../../constants/constants";
import LoadMore from "../../../components/load-more/load-more";
import NotFound from "../../not-found";
import { Metadata } from "next";
import pageMetadata from "../../../util/pageMetadata";
import notFoundMetadata from "../../../util/notFoundMetadata";
import "./tag.scss";
import getTag from "../../../graphql/getTag";
import getTags from "../../../graphql/getTags";
import PostsList from "../../../components/posts-list/posts-list";

type TagProps = {
  params: {
    slug: string;
  };
};

export default async function Tag({ params }: TagProps) {
  const tag = await getTag(params.slug);

  if (tag) {
    return (
      <main className="tag archive layout-container">
        <header className="archive-header">
          <h1 className="archive-title">#{tag.name}</h1>
        </header>
        <PostsList posts={tag.posts.map((item) => item.node)} />
        {tag.hasNextPage && (
          <LoadMore afterCursor={tag.endCursor} tagSlug={params.slug} />
        )}
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const tags = await getTags();

  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: TagProps): Promise<Metadata> {
  const tag = await getTag(params.slug);
  const url = `${routes.TAG}/${params.slug}`;

  if (tag) {
    return pageMetadata({
      url,
      titleFollowUp: tag.name,
      twitterCard: "summary",
    });
  } else {
    return notFoundMetadata(url);
  }
}
