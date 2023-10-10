"use client";

import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { APIPostPreview } from "../../../../graphql/types/post-preview";
import getPostsPreviews from "../../../../graphql/getPostsPreviews";
import PostsGrid from "../../../posts-grid/posts-grid";
import LoadMore from "../../../load-more/load-more";
import "./search-modal.scss";
import SearchForm from "./components/search-form";
import { usePathname } from "next/navigation";
import SearchSVG from "../../../svg/search";

export default function SearchModal() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [posts, setPosts] = useState<APIPostPreview[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPosts = async (query: string) => {
    const posts = await getPostsPreviews("", query);

    if (posts) {
      setPosts(posts.items.map((item) => item.node));
      setHasNextPage(posts.hasNextPage);
      setEndCursor(posts.endCursor);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPosts(query).then(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <>
      <button className="header-top__search-btn hoverable" onClick={handleShow}>
        <SearchSVG />
      </button>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="search-modal-body layout-container">
            <SearchForm setQuery={setQuery} loading={loading} />
            {query && !loading && (
              <h1>
                Wyniki wyszukiwania dla frazy: <span>{query}</span>
              </h1>
            )}
            {posts.length === 0 && query && !loading && <div>Brak wyników</div>}
            {posts.length > 0 && <PostsGrid posts={posts} />}
            {hasNextPage && <LoadMore afterCursor={endCursor} />}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
