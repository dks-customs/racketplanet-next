import { connectStateResults } from "react-instantsearch-dom";

const HitCount = connectStateResults(({ searchResults, searchState }) => {
  const hitCount = searchResults && searchResults.nbHits;

  if (hitCount > 0 && searchState.query) {
    return (
      <div className="search-results__hit-count">
        <div className="search-results__hit-count__title">
          {hitCount === 1 && "1 wynik dla frazy"}
          {hitCount > 1 && hitCount <= 4 && `${hitCount} wyniki dla frazy`}
          {hitCount > 4 && `${hitCount} wyników dla frazy`}
        </div>
        <h1 className="search-results__hit-count__query">
          {searchState.query}
        </h1>
      </div>
    );
  } else {
    return null;
  }
});

export default HitCount;
