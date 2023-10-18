export const WEBSITE_TITLE = "Racket Planet";
export const WEBSITE_DESCRIPTION = "Centrum Sportów Rakietowych";
export const FACEBOOK_URL = "https://www.facebook.com/racketplanetpl";
export const INSTAGRAM_URL = "https://www.instagram.com/racketplanetpl";
export const POSTS_PER_PAGE = 14;
export const MAPTILER_API_KEY = "apksbcaqlt6gXwMNguky";
export const RACKETPLANET_EMAIL = "kontakt@racketplanet.pl";
export const GA_COOKIE_NAME = "rp_ga";
export const DISQUS_COOKIE_NAME = "rp_disqus";
export const HEAD_AUTHOR_ID = 2;
export const ACTIVE_AUTHORS_IDS = [9, 7];
export const INACTIVE_AUTHORS_IDS = [3, 4, 8];
export const DISQUS_SHORTNAME = "rp-test-1";
export const GETFORM_ENDPOINT_URL =
  "https://getform.io/f/dd925cac-8d24-4090-b330-6ad976da6446";
export const AUTHORS_IDS = [
  HEAD_AUTHOR_ID,
  ...ACTIVE_AUTHORS_IDS,
  ...INACTIVE_AUTHORS_IDS,
];

export const routes = {
  HOME: "/",
  RACKET_MAPA: "/racket-mapa",
  EVENTS: "/kalendarz",
  SPORT: "/sport",
  CATEGORY: "/kategoria",
  TAG: "/tag",
  PRIVACY_POLICY: "/polityka-prywatnosci",
  ABOUT: "/o-nas",
  CONTACT: "/kontakt",
  TEAM: "/redakcja",
  SEARCH: "/szukaj",
};

export const GOOGLE_ANALYTICS_TRACKING_ID = (() => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID) {
    throw new Error(`
        Please provide a valid google analytics tracking id.
      `);
  }

  return process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;
})();

export const CANONICAL_BASE = (() => {
  if (!process.env.NEXT_PUBLIC_CANONICAL_BASE) {
    throw new Error(`
        Please provide a valid canonical home url.
      `);
  }

  return process.env.NEXT_PUBLIC_CANONICAL_BASE;
})();

export const API_URL = (() => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
    throw new Error(`
    Please provide a valid wordpress API url.
  `);
  }

  return process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
})();
