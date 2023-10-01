export default function stripHtmlTags(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, "").slice(0, -1);
}
