export type APIPlace = {
  placeId: number;
  placeAcfOsm: {
    lat?: number;
    lng?: number;
    address?: string;
  };
  placeAcf: {
    name?: string;
    description?: string;
    webpage?: string;
  };
  sports: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
};
