import { FeaturedImageAPI } from "./featuredImage";
import { APIPostPreview } from "./post-preview";

export type PostAPI = {
  id: string;
  databaseId: number;
  isSticky: boolean;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  featuredImage?: FeaturedImageAPI;
  author: {
    node: {
      name: string;
      slug: string;
      databaseId: number;
      avatar: {
        url: string;
      };
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
  tags: {
    nodes: {
      slug: string;
      name: string;
    }[];
  };
  morePosts: APIPostPreview[];
};
