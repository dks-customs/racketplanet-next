export const WEBSITE_TITLE = "Racket Planet";
export const WEBSITE_DESCRIPTION = "Centrum Sportów Rakietowych";
export const FACEBOOK_URL = "https://www.facebook.com/racketplanetpl";
export const INSTAGRAM_URL = "https://www.instagram.com/racketplanetpl";

export const routes = {
  HOME: "/",
  RACKET_MAPA: "/racket-mapa",
  EVENTS: "/wydarzenia",
  SPORTS: "/dyscypliny",
  TAG: "/tag",
  PRIVACY_POLICY: "/polityka-prywatnosci",
  TERMS: "/regulamin",
  ABOUT: "/o-nas",
  CONTACT: "/kontakt",
  TEAM: "/redakcja",
  SEARCH: "/szukaj",
};

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
      Add to your environment variables NEXT_PUBLIC_ALGOLIA_APP_ID.
    `);
  }

  return process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
})();

export const NEXT_PUBLIC_ALGOLIA_SEARCH_KEY = (() => {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY) {
    throw new Error(`
    Please provide a valid Algolia Search Key.
    Add to your environment variables NEXT_PUBLIC_ALGOLIA_SEARCH_KEY.
  `);
  }

  return process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
})();

export const API_URL = (() => {
  if (typeof window === "undefined") {
    if (!process.env.WORDPRESS_API_URL) {
      throw new Error(`
        Please provide a valid WordPress instance URL.
        Add to your environment variables WORDPRESS_API_URL.
      `);
    }

    return process.env.WORDPRESS_API_URL;
  } else {
    return "";
  }
})();

export const ALGOLIA_ADMIN_KEY = (() => {
  if (typeof window === "undefined") {
    if (!process.env.ALGOLIA_ADMIN_KEY) {
      throw new Error(`
        Please provide a valid Algolia admin key.
        Add to your environment variables ALGOLIA_ADMIN_KEY.
      `);
    }

    return process.env.ALGOLIA_ADMIN_KEY;
  } else {
    return "";
  }
})();
