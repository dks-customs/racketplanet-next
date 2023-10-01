import React from "react";
import ReactPaginate from "react-paginate";
import { connectPagination } from "react-instantsearch-dom";
import "./search-pagination.scss";

type PaginationEvent = {
  selected: number;
};

const SearchPagination = connectPagination(({ nbPages, refine }) => {
  const handlePageChange = (event: PaginationEvent) => {
    refine(event.selected + 1);
  };

  if (nbPages > 1) {
    return (
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageChange}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={nbPages}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        initialPage={0}
        renderOnZeroPageCount={() => null}
      />
    );
  } else {
    return null;
  }
});

export default SearchPagination;
