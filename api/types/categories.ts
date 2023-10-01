export type Categories = {
  id: string;
  name: string;
  slug: string;
  parent: {
    node: {
      id: string;
      name: string;
      slug: string;
    };
  } | null;
  children: {
    nodes: {
      id: string;
      name: string;
      slug: string;
      children: {
        nodes: {
          id: string;
          name: string;
          slug: string;
        }[];
      };
    }[];
  };
}[];
