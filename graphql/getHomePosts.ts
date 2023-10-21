import { POSTS_PER_PAGE, POSTS_PER_PAGE_HOME } from "../constants/constants";
import fetchApi from "../util/fetchApi";
import filterHiddenPosts from "../util/filterHiddenPosts";
import { postPreviewFragment } from "./fragments/post-preview";
import { APIPostPreview } from "./types/post-preview";

type PostsAPIData = {
  posts: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: {
      node: APIPostPreview;
    }[];
  };
};

export default async function getHomePosts() {
  let nextPage: boolean = true;
  let endCursor: string = "";
  let posts: APIPostPreview[] = [];

  do {
    const data = await fetchApi<PostsAPIData | undefined>(
      `
      query HomePosts {
        posts(first: 100, after: "${endCursor}") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              ${postPreviewFragment}
            }
          }
        }
      }
    `
    );

    if (data) {
      nextPage = data.posts.pageInfo.hasNextPage;
      endCursor = data.posts.pageInfo.endCursor;
      posts = posts.concat(
        data.posts.edges.filter(filterHiddenPosts).map((edge) => edge.node)
      );
    }
  } while (nextPage);

  if (posts.length > 0) {
    const hero = posts.shift();

    let sticky: APIPostPreview | undefined;

    const afterSticky = posts.filter((post) => {
      if (!sticky) {
        if (post.isSticky) {
          sticky = post;
          return false;
        }
      }

      return true;
    });

    const newest = afterSticky.splice(0, POSTS_PER_PAGE_HOME);

    const afterNewest = afterSticky;

    const categories: { [x: string]: APIPostPreview[] } = {};
    const indexes: number[] = [];

    afterNewest.forEach((post, index) => {
      post.categories.nodes.every((category) => {
        const categoryPosts = categories[category.slug];

        if (category.slug !== "newsy") {
          if (categoryPosts && categoryPosts.length < 3) {
            categoryPosts.push(post);
            indexes.push(index);
            return false;
          } else if (!categoryPosts) {
            categories[category.slug] = [post];
            indexes.push(index);
            return false;
          }
        }
      });
    });

    const remaining = afterNewest.filter((post, index) => {
      if (indexes.includes(index)) return false;
      else return true;
    });

    return {
      hero,
      sticky,
      newest,
      categories,
      remaining,
    };
  }

  return undefined;
}
