import fetchApi from "../util/fetchApi";

type ContactAPIData = {
  pageBy: {
    content: string;
    title: string;
  };
};

export default async function getContact() {
  const data = await fetchApi<ContactAPIData | undefined>(
    `
    query Contact {
      pageBy(pageId: 95) {
        content
        title
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
