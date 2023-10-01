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
