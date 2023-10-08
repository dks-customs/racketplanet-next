import { Metadata } from "next";
import getAuthors from "../../../../graphql/getAuthors";
import authorSlug from "../../../../util/authorSlug";
import "./author.scss";
import getAuthor from "../../../../graphql/getAuthor";
import pageMetadata from "../../../../util/pageMetadata";
import notFoundMetadata from "../../../../util/notFoundMetadata";
import NotFound from "../../../not-found";
import PostsList from "../../../../components/posts-list/posts-list";
import LoadMore from "../../../../components/load-more/load-more";

type AuthorProps = {
  params: {
    pid: string;
    slug: string;
  };
};

export default async function Author({ params }: AuthorProps) {
  const author = await getAuthor(params.pid);

  if (author && authorSlug(author.name) === params.slug) {
    return (
      <main className="author layout-container">
        <div>
          <img src={`${author.avatarUrl}`} />
          <div>
            <h1>{author.name}</h1>
            <p>{author.description}</p>
          </div>
        </div>
        <div>
          <PostsList posts={author.posts.map((item) => item.node)} />
          {author.hasNextPage && (
            <LoadMore afterCursor={author.endCursor} authorId={params.pid} />
          )}
        </div>
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors();

  return authors?.allAuthors.map((author) => ({
    pid: author.databaseId.toString(),
    slug: authorSlug(author.name),
  }));
}

export async function generateMetadata({
  params,
}: AuthorProps): Promise<Metadata> {
  const author = await getAuthor(params.pid);

  const url = `${params.pid}/${params.slug}`;

  if (author && authorSlug(author.name) === params.slug) {
    return pageMetadata({
      url,
      titleFollowUp: `${author.name} - Redakcja`,
      twitterCard: "summary",
      description: author.description,
      ogType: "website",
    });
  } else {
    return notFoundMetadata(url);
  }
}
