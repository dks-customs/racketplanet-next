import { Metadata } from "next";
import getAuthors from "../../../../graphql/getAuthors";
import authorSlug from "../../../../util/authorSlug";
import "./author.scss";
import getAuthor from "../../../../graphql/getAuthor";
import pageMetadata from "../../../../util/pageMetadata";
import notFoundMetadata from "../../../../util/notFoundMetadata";
import NotFound from "../../../not-found";
import LoadMore from "../../../../components/load-more/load-more";
import PostsListBasic from "../../../../components/posts-list-basic/posts-list-basic";
import PostsList from "../../../../components/posts-list/posts-list";

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
        <div className="author-container">
          <header className="author-header">
            <img
              className="author-header__image"
              src={`${author.avatarUrl}`}
              width="90"
              height="90"
            />
            <div className="author-header__text">
              <h1>{author.name}</h1>
              <p>{author.description}</p>
            </div>
          </header>
          <div>
            <PostsListBasic posts={author.posts.map((item) => item.node)} />
            {author.hasNextPage && (
              <LoadMore
                afterCursor={author.endCursor}
                authorId={params.pid}
                variant="basic"
              />
            )}
          </div>
        </div>
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors();

  if (authors) {
    return authors.allAuthors.map((author) => ({
      pid: author.databaseId.toString(),
      slug: authorSlug(author.name),
    }));
  } else {
    return [];
  }
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
