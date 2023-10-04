import pageMetadata from "./pageMetadata";

export default function notFoundMetadata(url: string) {
  return pageMetadata({
    url: url,
    titleFollowUp: "Nie znaleziono strony",
    twitterCard: "summary",
    description: "",
    ogType: "article",
  });
}
