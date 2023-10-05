export const WEBSITE_TITLE = "Racket Planet";
export const WEBSITE_DESCRIPTION = "Centrum Sportów Rakietowych";
export const FACEBOOK_URL = "https://www.facebook.com/racketplanetpl";
export const INSTAGRAM_URL = "https://www.instagram.com/racketplanetpl";
export const POSTS_PER_PAGE = 14;
export const MAPTILER_API_KEY = "apksbcaqlt6gXwMNguky";

export const routes = {
  HOME: "/",
  RACKET_MAPA: "/racket-mapa",
  EVENTS: "/wydarzenia",
  SPORT: "/sport",
  CATEGORY: "/kategoria",
  TAG: "/tag",
  PRIVACY_POLICY: "/polityka-prywatnosci",
  TERMS: "/regulamin",
  ABOUT: "/o-nas",
  CONTACT: "/kontakt",
  TEAM: "/redakcja",
  SEARCH: "/szukaj",
};

export const DISQUS_SHORTNAME = (() => {
  if (!process.env.NEXT_PUBLIC_DISQUS_SHORTNAME) {
    throw new Error(`
        Please provide a valid disqus shortname.
      `);
  }

  return process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;
})();

export const CANONICAL_BASE = (() => {
  if (!process.env.NEXT_PUBLIC_CANONICAL_BASE) {
    throw new Error(`
        Please provide a valid canonical home url.
      `);
  }

  return process.env.NEXT_PUBLIC_CANONICAL_BASE;
})();

export const NEXT_PUBLIC_ALGOLIA_APP_ID = (() => {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
    throw new Error(`
      Please provide a valid Algolia App Id.
    `);
  }

  return process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
})();

export const NEXT_PUBLIC_ALGOLIA_SEARCH_KEY = (() => {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY) {
    throw new Error(`
    Please provide a valid Algolia Search Key.
  `);
  }

  return process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
})();

export const API_URL = (() => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
    throw new Error(`
    Please provide a valid wordpress API url.
  `);
  }

  return process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
})();

export const ALGOLIA_ADMIN_KEY = (() => {
  if (typeof window === "undefined") {
    if (!process.env.ALGOLIA_ADMIN_KEY) {
      throw new Error(`
        Please provide a valid Algolia admin key.
      `);
    }

    return process.env.ALGOLIA_ADMIN_KEY;
  } else {
    return "";
  }
})();
