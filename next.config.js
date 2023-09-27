if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const domains = ["0.gravatar.com", "1.gravatar.com"];

if (process.env.WORDPRESS_DOMAIN) domains.push(WORDPRESS_DOMAIN);

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains,
  },
};
