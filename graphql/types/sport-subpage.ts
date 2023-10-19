export type APISportSubpage = {
  sportId: number;
  name: string;
  pages: {
    nodes: {
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      content: string;
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
            }[];
          };
        };
      };
      ustawieniaStrony?: {
        nazwaFederacji?: string;
        prezesFederacji?: string;
        stronaFederacji?: string;
        typStrony?: "Historia" | "Zasady" | "W Polsce";
      };
    }[];
  };
};
