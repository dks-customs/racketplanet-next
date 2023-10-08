export type APIEvent = {
  slug: string;
  title: string;
  content: string;
  eventId: number;
  modified: string;
  sports: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  eventAcfOsm: {
    address: string;
    lat: number;
    lng: number;
  };
  eventAcf: {
    name: string;
    dateBegin: string;
    dateEnd?: string;
    eventCity: string;
    price: string;
    webpage: string;
  };
};
