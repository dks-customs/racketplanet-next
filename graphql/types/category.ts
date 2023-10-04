import { APIPostPreview } from "./post-preview";

export type APICategory = {
  categoryId: number;
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
};
