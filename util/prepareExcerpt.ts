export default function prepareExcerpt(
  excerptHtml: string | undefined
): string {
  if (excerptHtml) {
    let excerpt = excerptHtml.replace("<p>", "").replace("</p>", "");

    if (excerpt.length > 300) {
      return "";
    } else {
      return excerpt;
    }
  } else {
    return "";
  }
}
