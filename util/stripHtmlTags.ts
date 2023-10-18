export default function stripHtmlTags(
  html: string,
  sliceLastChar: boolean = true
) {
  const escapedHtml = html.replace(/<\/?[^>]+(>|$)/g, "");

  if (sliceLastChar) {
    return escapedHtml.slice(0, -1);
  } else {
    return escapedHtml;
  }
}
