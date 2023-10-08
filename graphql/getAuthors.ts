import {
  ACTIVE_AUTHORS_IDS,
  HEAD_AUTHOR_ID,
  INACTIVE_AUTHORS_IDS,
} from "../constants/constants";
import fetchApi from "../util/fetchApi";

type AuthorsAPIData = {
  users: {
    nodes: {
      name: string;
      description: string;
      slug: string;
      databaseId: number;
      avatar: {
        url: string;
      };
    }[];
  };
};

export default async function getAuthors() {
  const data = await fetchApi<AuthorsAPIData | undefined>(
    `
    query Users {
      users {
        nodes {
          name
          description
          slug
          databaseId
          avatar {
            url
          }
        }
      }
    }
  `
  );

  if (data?.users) {
    let headAuthor: AuthorsAPIData["users"]["nodes"][0] | null = null;
    const activeAuthors: AuthorsAPIData["users"]["nodes"] = [];
    const inactiveAuthors: AuthorsAPIData["users"]["nodes"] = [];

    data.users.nodes.forEach((user) => {
      if (user.databaseId === HEAD_AUTHOR_ID) {
        headAuthor = user;
      }
      if (ACTIVE_AUTHORS_IDS.includes(user.databaseId)) {
        activeAuthors.push(user);
      }
      if (INACTIVE_AUTHORS_IDS.includes(user.databaseId)) {
        inactiveAuthors.push(user);
      }
    });

    return {
      headAuthor: headAuthor as AuthorsAPIData["users"]["nodes"][0] | null,
      activeAuthors,
      inactiveAuthors,
    };
  } else {
    return undefined;
  }
}
