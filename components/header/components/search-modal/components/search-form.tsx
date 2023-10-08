import { Dispatch, SetStateAction } from "react";
import "./search-form.scss";
import { Button, Form, Spinner } from "react-bootstrap";
import SearchSVG from "../../../../svg/search";

type SearchFormProps = {
  setQuery: Dispatch<SetStateAction<string>>;
  loading: boolean;
};

export default function SearchForm({ setQuery, loading }: SearchFormProps) {
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setQuery(e.target[0].value);
  };

  return (
    <Form onSubmit={onSearch}>
      <Form.Group className="mb-3" controlId="search-query">
        <Form.Control
          type="text"
          placeholder="Szukaj w Racket Planet"
          name="search-query"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {loading ? (
          <Spinner />
        ) : (
          <>
            Szukaj
            <SearchSVG />
          </>
        )}
      </Button>
    </Form>
  );
}
