export const featuredImageFragment = `
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
`;
