export type APIPostPreview = {
  id: string;
  databaseId: number;
  isSticky: boolean;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      altText?: string;
      sourceUrl: string;
      mediaDetails: {
        sizes: {
          name: string;
          sourceUrl: string;
          height: string;
          width: string;
        };
      };
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
      parent: {
        node: {
          slug: string;
          name: string;
        };
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
