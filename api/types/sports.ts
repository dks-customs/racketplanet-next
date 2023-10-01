export type Sports = {
  name: string;
  slug: string;
  pages: {
    nodes: {
      slug: string;
      ustawieniaStrony: {
        typStrony: "Historia" | "W Polsce" | "Zasady";
      };
    }[];
  };
}[];
