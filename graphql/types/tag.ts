import { APIPostPreview } from "./post-preview";

export type APITag = {
  tagId: number;
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
