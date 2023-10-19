import Link from "next/link";
import "./post-categories.scss";
import { routes } from "../../constants/constants";

type PostCategoriesProps = {
  links?: boolean;
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

export default function PostCategories({
  categories,
  links = true,
}: PostCategoriesProps) {
  const cats = categories
    .filter((category) => category.children.nodes.length === 0)
    .filter((category) => category.slug !== "hidden");

  if (cats.length > 0) {
    return (
      <ul className="post-categories">
        {categories.map((category) => (
          <li key={`post-categories-${category.slug}`}>
            {links && (
              <Link href={`${routes.CATEGORY}/${category.slug}`}>
                {category.name}
              </Link>
            )}
            {!links && <span>{category.name}</span>}
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}
