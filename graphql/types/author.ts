import { APIPostPreview } from "./post-preview";

export type APIAuthor = {
  databaseId: number;
  name: string;
  description: string;
  avatar: {
    url: string;
  };
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
