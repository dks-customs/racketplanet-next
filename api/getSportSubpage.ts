import fetchApi from "../util/fetchApi";
import subpageSlug from "../util/subpageSlug";
import { APISportSubpage } from "./types/sport-subpage";

type SportSubpageAPIData = {
  sports: {
    nodes: APISportSubpage[];
  };
};

export default async function getSportSubpage(sportSlug: string, slug: string) {
  const data = await fetchApi<SportSubpageAPIData>(
    `
      query Sport {
        sports(first: 1, where: {slug: "${sportSlug}"}) {
          nodes {
            name
            sportId
            pages {
              nodes {
                id
                slug
                title
                excerpt
                content
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    mediaDetails {
                      sizes {
                        name
                        sourceUrl
                        height
                        width
                      }
                    }
                  }
                }
                ustawieniaStrony {
                  nazwaFederacji
                  prezesFederacji
                  stronaFederacji
                  typStrony
                }
              }
            }
          }
        }
      }
    `
  );

  const sport = data.sports.nodes[0];

  if (sport) {
    const subpages = sport.pages.nodes;
    const filteredSubpages = subpages.filter(
      (subpage) => slug === subpageSlug(subpage.slug, sportSlug)
    );

    const subpage = filteredSubpages[0];

    if (subpage) return subpage;
  }

  return undefined;
}
