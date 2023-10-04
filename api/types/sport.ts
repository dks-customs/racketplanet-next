import { APIPostPreview } from "./post-preview";

export type APISport = {
  sportId: number;
  name: string;
  posts: {
    edges: {
      cursor: string;
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
