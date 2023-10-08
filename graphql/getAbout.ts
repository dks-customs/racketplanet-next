import fetchApi from "../util/fetchApi";

type AboutAPIData = {
  pageBy: {
    content: string;
    title: string;
  };
};

export default async function getAbout() {
  const data = await fetchApi<AboutAPIData | undefined>(
    `
    query About {
      pageBy(pageId: 80) {
        content
        title
      }
    }
  `
  );

  if (data) {
    return data;
  } else {
    return undefined;
  }
}
