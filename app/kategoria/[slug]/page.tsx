import Link from "next/link";
import getCategories from "../../../api/getCategories";
import { POSTS_PER_PAGE } from "../../../constants/constants";
import "./category.scss";
import getCategory from "../../../api/getCategory";
import LoadMore from "../../../components/load-more/load-more";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const category = await getCategory(params.slug);

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
}

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = "force-cache";

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories
    .filter((category) => category.children.nodes.length === 0)
    .map((category) => ({
      slug: category.slug,
      id: category.id,
    }));
}
