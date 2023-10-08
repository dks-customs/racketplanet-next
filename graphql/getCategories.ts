import fetchApi from "../util/fetchApi";
import { APICategories } from "./types/categories";

type CategoriesAPIData = {
  categories: {
    nodes: APICategories;
  };
};

export default async function getCategories(): Promise<APICategories> {
  const data = await fetchApi<CategoriesAPIData | undefined>(
    `
      query Categories {
        categories(first: 100) {
          nodes {
            id
            name
            slug
            parent {
              node {
                id
                name
                slug
              }
            }
            children {
              nodes {
                id
                name
                slug
              }
            }
          }
        }
      }
    `
  );

  if (data?.categories?.nodes) {
    let other: APICategories[0] | undefined;

    const categories = data.categories.nodes.filter((c) => {
      if (c.slug === "inne") other = c;

      return (
        !["hidden", "bez-kategorii", "inne"].includes(c.slug) && !c.parent?.node
      );
    });

    if (other) categories.push(other);

    return categories;
  }

  return [];
}
