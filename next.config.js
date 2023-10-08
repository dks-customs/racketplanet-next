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

if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID) {
  throw new Error(`
    Please provide a valid google analytics tracking id.
    Add to your environment variables NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID.
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
