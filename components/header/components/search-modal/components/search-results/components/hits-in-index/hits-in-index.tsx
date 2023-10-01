import { Index } from "react-instantsearch-dom";
import HitCount from "../hits-count/hits-count";
import Hits from "../hits/hits";

const HitsInIndex = ({ index }: any) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits />
  </Index>
);

export default HitsInIndex;
