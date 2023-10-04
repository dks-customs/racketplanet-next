import { connectHits } from "react-instantsearch-dom";
import PostsGrid from "../../../../../../../posts-grid/posts-grid";
import { APIPostPreview } from "../../../../../../../../graphql/types/post-preview";

const Hits = connectHits(({ hits }: { hits: APIPostPreview[] }) => {
  return <PostsGrid posts={hits} />;
});

export default Hits;
