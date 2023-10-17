import getCategories from "../../../graphql/getCategories";
import { routes } from "../../../constants/constants";
import "./category.scss";
import getCategory from "../../../graphql/getCategory";
import LoadMore from "../../../components/load-more/load-more";
import NotFound from "../../not-found";
import { Metadata } from "next";
import pageMetadata from "../../../util/pageMetadata";
import notFoundMetadata from "../../../util/notFoundMetadata";
import PostsList from "../../../components/posts-list/posts-list";

type CategoryProps = {
  params: {
    slug: string;
  };
};

export default async function Category({ params }: CategoryProps) {
  const category = await getCategory(params.slug);

  if (category) {
    return (
      <main className="category archive layout-container">
        <header className="archive-header">
          <h1 className="archive-title">{category.name}</h1>
        </header>
        <PostsList
          posts={category.posts.map((item) => item.node)}
          showCategory={false}
        />
        {category.hasNextPage && (
          <LoadMore
            afterCursor={category.endCursor}
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
  const url = `${routes.CATEGORY}/${params.slug}`;

  if (category) {
    return pageMetadata({
      url,
      titleFollowUp: category.name,
      twitterCard: "summary",
    });
  } else {
    return notFoundMetadata(url);
  }
}
