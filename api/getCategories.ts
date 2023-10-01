import fetchApi from "../util/fetchApi";
import { Categories } from "./types/categories";

type CategoriesApiData = {
  categories: {
    nodes: Categories;
  };
};

export default async function getCategories(): Promise<Categories> {
  const data = await fetchApi<CategoriesApiData>(
    `
      query Categories {
        categories {
          nodes {
            slug
            id
            parent {
              node {
                slug
              }
            }
            children {
              nodes {
                slug
                id
              }
            }
          }
        }
      }
    `
  );

  if (data?.categories?.nodes) {
    let other: Categories[0] | undefined;

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
