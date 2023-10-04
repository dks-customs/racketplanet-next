if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
  throw new Error(`
  Please provide a valid wordpress API url.
  Add to your environment variables NEXT_PUBLIC_WORDPRESS_API_URL.
`);
}

if (!process.env.WORDPRESS_DOMAIN) {
  throw new Error(`
    Please provide a valid Wordpress backend domain URL.
    Add to your environment variables WORDPRESS_DOMAIN.
  `);
}

if (!process.env.NEXT_PUBLIC_CANONICAL_BASE) {
  throw new Error(`
    Please provide a valid canonical home url.
    Add to your environment variables NEXT_PUBLIC_HOME_CANONICAL.
  `);
}

if (!process.env.ALGOLIA_ADMIN_KEY) {
  throw new Error(`
    Please provide a valid Algolia admin key.
    Add to your environment variables ALGOLIA_ADMIN_KEY.
  `);
}

if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
  throw new Error(`
    Please provide a valid Algolia App Id.
    Add to your environment variables NEXT_PUBLIC_ALGOLIA_APP_ID.
  `);
}

if (!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY) {
  throw new Error(`
    Please provide a valid Algolia Search Key.
    Add to your environment variables NEXT_PUBLIC_ALGOLIA_SEARCH_KEY.
  `);
}

if (!process.env.NEXT_PUBLIC_DISQUS_SHORTNAME) {
  throw new Error(`
      Please provide a valid disqus shortname.
      Add to your environment variables NEXT_PUBLIC_DISQUS_SHORTNAME.
    `);
}

domains = ["0.gravatar.com", "1.gravatar.com", process.env.WORDPRESS_DOMAIN];

/** @type {import('next').NextConfig} */
module.exports = {
  sassOptions: {
    additionalData: `@import "styles/util/_functions.scss";@import "styles/util/_variables.scss";@import "styles/util/_mixins.scss";`,
  },
  images: {
    domains,
  },
};
