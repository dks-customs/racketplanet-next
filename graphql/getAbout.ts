import fetchApi from "../util/fetchApi";

type AboutAPIData = {
  pageBy: {
    content: string;
    title: string;
    modified: string;
  };
};

export default async function getAbout() {
  const data = await fetchApi<AboutAPIData | undefined>(
    `
    query About {
      pageBy(pageId: 80) {
        content
        title
        modified
      }
    }
  `
  );

  if (data) {
    return data.pageBy;
  } else {
    return undefined;
  }
}
