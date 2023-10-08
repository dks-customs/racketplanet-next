import fetchApi from "../util/fetchApi";

type PrivacyPolicyAPIData = {
  pageBy: {
    content: string;
    title: string;
    modified: string;
  };
};

export default async function getPrivacyPolicy() {
  const data = await fetchApi<PrivacyPolicyAPIData | undefined>(
    `
    query PrivacyPolicy {
      pageBy(pageId: 3) {
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
