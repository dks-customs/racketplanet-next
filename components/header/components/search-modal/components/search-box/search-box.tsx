import { Button, Form } from "react-bootstrap";
import "./search-box.scss";
import SearchSVG from "../../../../../svg/search";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = connectSearchBox(({ refine }) => {
  const [phrase, setSearchPhrase] = useState<string>("");
  const [query] = useDebounce(phrase, 1000);

  useEffect(() => {
    refine(query);
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="search-phrase-input">
        <Form.Control
          type="text"
          placeholder="Szukaj w Racket Planet"
          aria-label="Szukaj"
          onChange={onChange}
          value={phrase}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        <SearchSVG />
      </Button>
    </Form>
  );
});

export default SearchBox;
