export default function subpageSlug(slug: string, sportSlug: string) {
  return slug.replace(`-${sportSlug}`, "");
}
