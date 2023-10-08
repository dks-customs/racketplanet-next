import removeAccents from "remove-accents";

export default function authorSlug(authorName: string) {
  return removeAccents(authorName).toLowerCase().replaceAll(" ", "-");
}
