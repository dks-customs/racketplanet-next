export type APIPostPreview = {
  id: string;
  databaseId: number;
  isSticky: boolean;
  slug: string;
  title: string;
  date: string;
  sports: {
    nodes: {
      slug: string;
      name: string;
      id: string;
    }[];
  };
  categories: {
    nodes: {
      name: string;
      uri: string;
      id: string;
      slug: string;
      parent: {
        node: {
          slug: string;
          name: string;
        };
      };
    }[];
  };
  excerpt?: string;
  featuredImage?: {
    node: {
      caption?: string;
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
      atrybucjaAutora?: {
        attachmentAuthor: string;
        attachmentUrl: string;
        license: string;
        licenseUrl: string;
      };
    };
  };
};
