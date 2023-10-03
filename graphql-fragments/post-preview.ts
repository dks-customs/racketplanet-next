export const postPreviewFragment = `
	id
	databaseId
	isSticky
	slug
	title
	date
	excerpt
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
