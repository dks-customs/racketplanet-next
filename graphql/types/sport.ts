import { APIPostPreview } from "./post-preview";

export type APISport = {
  sportId: number;
  name: string;
  posts: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: {
      node: APIPostPreview;
    }[];
  };
  pages: {
    nodes: {
      slug: string;
      title: string;
      id: string;
    }[];
  };
};
