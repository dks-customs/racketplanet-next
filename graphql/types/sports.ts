export type APISports = {
  id: string;
  name: string;
  slug: string;
  pages: {
    nodes: {
      id: string;
      slug: string;
      excerpt: string;
      ustawieniaStrony: {
        typStrony: "Historia" | "W Polsce" | "Zasady";
      };
    }[];
  };
}[];
