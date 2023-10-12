export type FeaturedImageAPI = {
  node: {
    altText?: string;
    sourceUrl: string;
    mediaDetails: {
      sizes: {
        name: string;
        sourceUrl: string;
        height: string;
        width: string;
      }[];
    };
    atrybucjaAutora: {
      attachmentAuthor?: string;
      attachmentUrl?: string;
      license?: string;
      licenseUrl?: string;
    };
  };
};
