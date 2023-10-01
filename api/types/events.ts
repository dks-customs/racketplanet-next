export type Events = {
  id: string;
  slug: string;
  eventAcf: {
    name: string;
    dateBegin: string;
    dateEnd?: string;
    eventCity: string;
  };
  sports: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}[];
