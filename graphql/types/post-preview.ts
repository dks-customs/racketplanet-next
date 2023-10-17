import { FeaturedImageAPI } from "./featuredImage";

export type APIPostPreview = {
  id: string;
  databaseId: number;
  isSticky: boolean;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  featuredImage?: FeaturedImageAPI;
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
      children: {
        nodes: {
          slug: string;
          name: string;
        }[];
      };
    }[];
  };
  sports: {
    nodes: {
      slug: string;
      name: string;
    }[];
  };
};
