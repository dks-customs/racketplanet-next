import Link from "next/link";
import getCategories from "../../../graphql/getCategories";
import { POSTS_PER_PAGE, routes } from "../../../constants/constants";
import "./category.scss";
import getCategory from "../../../graphql/getCategory";
import LoadMore from "../../../components/load-more/load-more";
import NotFound from "../../not-found";
import { Metadata } from "next";
import pageMetadata from "../../../util/pageMetadata";

type CategoryProps = {
  params: {
    slug: string;
  };
};

export default async function Category({ params }: CategoryProps) {
  const category = await getCategory(params.slug);

  if (category) {
    return (
      <main className="category layout-container">
        <h1>{category.name}</h1>
        <ul className="posts">
          {category.posts.map((post) => (
            <li key={post.node.id}>
              <article>
                <Link href={`/${post.node.databaseId}/${post.node.slug}`}>
                  {post.node.title}
                </Link>
              </article>
            </li>
          ))}
        </ul>
        {category.haveNextPage && (
          <LoadMore
            afterPostCursor={category.posts[POSTS_PER_PAGE - 1].cursor}
            categorySlug={params.slug}
          />
        )}
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories
    .filter((category) => category.children.nodes.length === 0)
    .map((category) => ({
      slug: category.slug,
    }));
}

export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  const category = await getCategory(params.slug);

  return pageMetadata({
    url: `${routes.CATEGORY}/${params.slug}`,
    titleFollowUp: category ? category.name : "Nie znaleziono strony",
    twitterCard: "summary",
  });
}
