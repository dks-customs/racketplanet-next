import { MetadataRoute } from "next";
import { CANONICAL_BASE, routes } from "../constants/constants";
import getPrivacyPolicy from "../graphql/getPrivacyPolicy";
import getAbout from "../graphql/getAbout";
import getContact from "../graphql/getContact";
import getAuthors from "../graphql/getAuthors";
import authorSlug from "../util/authorSlug";
import getAllPostsMeta from "../graphql/getAllPostsMeta";
import getCategories from "../graphql/getCategories";
import getSports from "../graphql/getSports";
import getTags from "../graphql/getTags";
import subpageSlug from "../util/subpageSlug";
import getEvents from "../graphql/getEvents";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastMajorSiteUpdate = new Date(2023, 10, 15);
  const base = CANONICAL_BASE;

  const items: {
    url: string;
    lastModified: string | Date | undefined;
  }[] = [];

  //HOME
  items.push({
    url: base,
    lastModified: lastMajorSiteUpdate,
  });

  //RACKET MAPA
  items.push({
    url: `${base}${routes.RACKET_MAPA}`,
    lastModified: lastMajorSiteUpdate,
  });

  //WYDARZENIA
  items.push({
    url: `${base}${routes.EVENTS}`,
    lastModified: lastMajorSiteUpdate,
  });

  //POLITYKA PRYWATNOSCI
  const privacyPolicy = await getPrivacyPolicy();
  if (privacyPolicy) {
    const modified = new Date(privacyPolicy.modified);

    items.push({
      url: `${base}${routes.PRIVACY_POLICY}`,
      lastModified:
        modified > lastMajorSiteUpdate ? modified : lastMajorSiteUpdate,
    });
  }

  //O NAS
  const about = await getAbout();
  if (about) {
    const modified = new Date(about.modified);
    items.push({
      url: `${base}${routes.ABOUT}`,
      lastModified:
        modified > lastMajorSiteUpdate ? modified : lastMajorSiteUpdate,
    });
  }

  //KONTAKT
  const contact = await getContact();
  if (contact) {
    const modified = new Date(contact.modified);

    items.push({
      url: `${base}${routes.CONTACT}`,
      lastModified:
        modified > lastMajorSiteUpdate ? modified : lastMajorSiteUpdate,
    });
  }

  //AUTORZY
  const authors = await getAuthors();
  if (authors) {
    authors.allAuthors.forEach((author) => {
      items.push({
        url: `${base}${routes.TEAM}/${author.databaseId}/${authorSlug(
          author.name
        )}`,
        lastModified: lastMajorSiteUpdate,
      });
    });
  }

  //ARTYKUŁY
  // lastModified jako moment wrzucenia strony na nexta lub jeśli data publikacji artykułu późniejsza, jako data publikacji artykułu
  // ID/SLUG

  const posts = await getAllPostsMeta();
  if (posts) {
    posts.forEach((post) => {
      const modified = new Date(post.modified);
      items.push({
        url: `${base}/${post.postId}/${post.slug}`,
        lastModified:
          modified > lastMajorSiteUpdate ? modified : lastMajorSiteUpdate,
      });
    });
  }

  // ---- WIECEJ ----
  const categories = await getCategories();
  if (categories) {
    categories.forEach((category) => {
      if (category.children.nodes.length > 0) {
        category.children.nodes.forEach((child) => {
          items.push({
            url: `${base}${routes.CATEGORY}/${child.slug}`,
            lastModified: lastMajorSiteUpdate,
          });
        });
      } else {
        items.push({
          url: `${base}${routes.CATEGORY}/${category.slug}`,
          lastModified: lastMajorSiteUpdate,
        });
      }
    });
  }

  const sports = await getSports();
  if (sports) {
    sports.forEach((sport) => {
      items.push({
        url: `${base}${routes.SPORT}/${sport.slug}`,
        lastModified: lastMajorSiteUpdate,
      });

      sport.pages.nodes.forEach((page) => {
        items.push({
          url: `${base}${routes.SPORT}/${sport.slug}/${subpageSlug(
            page.slug,
            sport.slug
          )}`,
          lastModified: lastMajorSiteUpdate,
        });
      });
    });
  }

  const tags = await getTags();
  if (tags) {
    tags.forEach((tag) => {
      items.push({
        url: `${base}${routes.TAG}/${tag.slug}`,
        lastModified: lastMajorSiteUpdate,
      });
    });
  }
  return items;
}
