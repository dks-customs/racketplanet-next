import Link from "next/link";
import "./post-categories.scss";
import { routes } from "../../constants/constants";

type PostCategoriesProps = {
  categories: {
    slug: string;
    name: string;
    children: {
      nodes: {
        slug: string;
        name: string;
      }[];
    };
  }[];
};

export default function PostCategories({ categories }: PostCategoriesProps) {
  const cats = categories.filter(
    (category) => category.children.nodes.length === 0
  );

  if (cats.length > 0) {
    return (
      <ul className="post-categories">
        {categories.map((category) => (
          <li key={`post-categories-${category.slug}`}>
            <Link href={`${routes.CATEGORY}/${category.slug}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
