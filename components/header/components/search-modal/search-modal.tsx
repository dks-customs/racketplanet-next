import { Modal } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";
import {
  Configure,
  InstantSearch,
  PoweredBy,
  ScrollTo,
} from "react-instantsearch-dom";
import useAlgolia from "./hooks/useAlgolia";
import "./search-modal.scss";
import SearchCredits from "./components/search-credits/search-credits";
import SearchResults from "./components/search-results/search-results";
import SearchBox from "./components/search-box/search-box";
import SearchPagination from "./components/search-pagination/search-pagination";

type SearchModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function SearchModal({ show, setShow }: SearchModalProps) {
  const [searchClient, indices, setQuery, query] = useAlgolia();

  return (
    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="algolia-search">
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <Configure hitsPerPage={12} />
            <ScrollTo>
              <SearchBox />
            </ScrollTo>
            <SearchResults show={query} indices={indices} />
            <SearchPagination />
            <SearchCredits />
          </InstantSearch>
        </div>
      </Modal.Body>
    </Modal>
  );
}
