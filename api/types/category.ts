import { APIPostPreview } from "./post-preview";

export type APICategory = {
  categoryId: number;
  name: string;
  posts: {
    edges: {
      cursor: string;
      node: APIPostPreview;
    }[];
  };
};
