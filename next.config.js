if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

if (!process.env.WORDPRESS_DOMAIN) {
  throw new Error(`
    Please provide a valid Wordpress backend domain URL.
    Add to your environment variables WORDPRESS_DOMAIN.
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
