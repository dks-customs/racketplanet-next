import {
  POSTS_PER_PAGE,
  POSTS_PER_PAGE_HOME,
  cyclesSlugs,
} from "../constants/constants";
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

    const heroMore = posts.splice(0, 4);

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

    const categories: { [x: string]: APIPostPreview[] } = {};
    const news: APIPostPreview[] = [];

    afterSticky.forEach((post, index) => {
      post.categories.nodes.every((category) => {
        if (category.slug !== "newsy") {
          if (cyclesSlugs.includes(category.slug)) {
            if (categories["cykle"]) {
              categories["cykle"].push(post);
            } else {
              categories["cykle"] = [post];
            }
          } else {
            if (categories[category.slug]) {
              categories[category.slug].push(post);
            } else {
              categories[category.slug] = [post];
            }
          }
        } else {
          news.push(post);
        }
      });
    });

    const postsGroups: {
      news: APIPostPreview[];
      category: {
        title: string;
        posts: APIPostPreview[];
      };
    }[] = [];

    Object.values(categories).forEach((categoryPosts) => {
      let categorySlug = categoryPosts[0].categories.nodes[0].slug;
      let categoryName = "";

      if (cyclesSlugs.includes(categorySlug)) {
        categoryName = "Cykle";
      } else {
        categoryName = categoryPosts[0].categories.nodes[0].name;
      }

      postsGroups.push({
        news: news.splice(0, 6),
        category: {
          title: categoryName,
          posts: categoryPosts,
        },
      });
    });

    return {
      hero,
      heroMore,
      sticky,
      postsGroups,
      remainingNews: news,
    };
  }

  return undefined;
}
