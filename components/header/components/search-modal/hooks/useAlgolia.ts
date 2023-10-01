import algoliasearch from "algoliasearch";
import {
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
} from "../../../../../constants/constants";
import { MultipleQueriesQuery } from "@algolia/client-search";
import { useState } from "react";

const algoliaClient = algoliasearch(
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

const searchClient = {
  search(requests: MultipleQueriesQuery[]) {
    return algoliaClient.search(requests);
  },
};

const indices = [{ name: `posts`, title: `Posty` }];

export default function useAlgolia() {
  const [query, setQuery] = useState<any>("");

  return [searchClient, indices, setQuery, query];
}
