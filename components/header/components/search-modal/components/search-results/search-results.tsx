import HitsInIndex from "./components/hits-in-index/hits-in-index";
import "./search-results.scss";

export default function SearchResults({ indices }: any) {
  return (
    <div className="search-results">
      {indices.map((index: any) => (
        <HitsInIndex index={index} key={index.name} />
      ))}
    </div>
  );
}
