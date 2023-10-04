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
	categories {
		nodes {
			name
			slug
			parent {
				node {
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
