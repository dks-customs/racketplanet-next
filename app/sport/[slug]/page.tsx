import Link from "next/link";
import getSport from "../../../graphql/getSport";
import getSports from "../../../graphql/getSports";
import NotFound from "../../not-found";
import LoadMore from "../../../components/load-more/load-more";
import { routes } from "../../../constants/constants";
import "./sport.scss";
import { Metadata } from "next";
import pageMetadata from "../../../util/pageMetadata";
import subpageSlug from "../../../util/subpageSlug";
import notFoundMetadata from "../../../util/notFoundMetadata";
import PostsList from "../../../components/posts-list/posts-list";

type SportProps = {
  params: {
    slug: string;
  };
};

export default async function Sport({ params }: SportProps) {
  const sport = await getSport(params.slug);

  if (sport) {
    const subpageTitle = (pageTitle: string) =>
      pageTitle.replace(` – ${sport.name}`, "");

    return (
      <main className="sport layout-container">
        <h1>{sport.name}</h1>
        <ul className="sport-subpages">
          {sport.pages.map((page) => (
            <li key={page.id}>
              <Link
                href={`${routes.SPORT}/${params.slug}/${subpageSlug(
                  page.slug,
                  params.slug
                )}`}
              >
                {subpageTitle(page.title)}
              </Link>
            </li>
          ))}
        </ul>
        <PostsList posts={sport.posts.map((item) => item.node)} />
        {sport.hasNextPage && (
          <LoadMore afterCursor={sport.endCursor} sportSlug={params.slug} />
        )}
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const sports = await getSports();

  return sports.map((sport) => ({
    slug: sport.slug,
  }));
}

export async function generateMetadata({
  params,
}: SportProps): Promise<Metadata> {
  const sport = await getSport(params.slug);
  const url = `${routes.SPORT}/${params.slug}`;

  if (sport) {
    return pageMetadata({
      url,
      titleFollowUp: sport.name,
      twitterCard: "summary",
    });
  } else {
    return notFoundMetadata(url);
  }
}
