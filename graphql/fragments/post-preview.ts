import { featuredImageFragment } from "./featured-image";

export const postPreviewFragment = `
	id
	databaseId
	isSticky
	slug
	title
	date
	excerpt
	${featuredImageFragment}
	author {
    node {
      name
		}
  }
	categories {
		nodes {
			name
			slug
			children {
				nodes {
					slug
					name
				}
			}
		}
	}
	sports {
		nodes {
			slug
			name
		}
	}
`;
